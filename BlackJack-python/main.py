import random

player_in = True
dealer_in = True

# Deck consists of cards (2-10) and face cards (B, D, K, A)
deck = [2, 3, 4, 5, 6, 7, 8, 9, 10] * 4 + ['B', 'D', 'K', 'A'] * 4

PH = []  # Player Hand
DH = []  # Dealer Hand


def deal_card(turn):
    card = random.choice(deck)
    turn.append(card)
    deck.remove(card)


def total(turn):
    score = 0
    face = ['B', 'D', 'K']
    ace_count = 0

    for card in turn:
        if isinstance(card, int):  # Check if card is an integer (2-10)
            score += card
        elif card in face:  # Face cards count as 10
            score += 10
        else:  # Ace case
            ace_count += 1

    # Calculate Aces value
    for _ in range(ace_count):
        if score + 11 > 21:  # If score + 11 exceeds 21, count Ace as 1
            score += 1
        else:
            score += 11  # Count Ace as 11

    return score


def reveal_dh():
    # Return the dealer's visible card
    if len(DH) == 2:
        return DH[0]
    elif len(DH) > 2:
        return DH[0], DH[1]


# Initial dealing of two cards each
for _ in range(2):
    deal_card(DH)
    deal_card(PH)

# Game loop
while player_in or dealer_in:
    print(f"Dealer has {reveal_dh()} and X")
    print(f"You have {PH} for a total of {total(PH)}")

    if player_in:
        stay_or_hit = input("1: Stay\n2: Hit\n")

        if stay_or_hit == '1':
            player_in = False
        elif stay_or_hit == '2':
            deal_card(PH)

    if total(DH) > 16:
        dealer_in = False
    else:
        deal_card(DH)

    # Check for win/lose conditions
    if total(PH) >= 21 or total(DH) >= 21:
        break

# Final results and win/lose logic
print(f"\nYou have {PH} for a total of {total(PH)} and the Dealer has {DH} for a total of {total(DH)}")

if total(PH) == 21:
    print("Black Jack! You Won a lot of WON!")
elif total(DH) == 21:
    print("Black Jack! Dealer wins!\nGive the Dealer your money.")
elif total(PH) > 21:
    print("You Bust! Dealer wins!")
elif total(DH) > 21:
    print("Dealer Busts! You win!\nTake back your money ;)")
elif total(PH) > total(DH):
    print("You win! Take the Dealer's money ;)")
else:
    print("You lose! Give the Dealer your money.")
