# Game objective

- Win the PePu

# Game challenges

## Primary challenges (tier 1, MVP)

- Large PLAYER / LOTTERY.NPCs.TICKETS ratio increases chance to WIN a LOTTERY
- BUYing TICKETS cost MONEY, must WORK for MONEY
- WORKing expends TIME, limited TIME between LOTTERY.EVENTs

## Secondary challenges (tier 2, nice to have)
- PLAYER becomes HUNGRY with passage of TIME, needs to EAT FOOD
    - PLAYER cannot SLEEP or WORK if too HUNGRY
    - FOOD costs MONEY, must balance MONEY spent on TICKETS and FOOD

- PLAYER becomes TIRED with passage of TIME, needs SLEEP
    - PLAYER cannot EAT or WORK if too TIRED
    - SLEEP costs TIME, must balance TIME spent on WORK and SLEEP

# Key game objects:
- PLAYER
    - HUNGRY = [0 - 1] // 1 is extremely hungry, 0 is fulfilled
    - MONEY = [0 - n]
    - TICKETS = [0 - n]
    - FOOD = [0 - n] // 1 food satisfies hunger created within a day
- TIME = [0 - n]
    - => MINUTES = TIME / 60 % 60
    - => HOURS = TIME % 24
    - => WEEKDAY/DAY = floor(TIME / 24) % 6
    - => WEEK/ROUND = floor(TIME / 24 / 7)
- LOTTERY
    - EVENT = [0 - 24, 0 - 6] // time & day
    - NPCs
        - TICKETS = [0 - n]

## Key Actions:
- All actions expend TIME
    - Must check if EVENTs begin within TIME STEP

- SLEEP => PLAYER.TIRED--
    - STEP = next morning
- WORK => PLAYER.MONEY++
    - STEP = 1h
- EAT => PLAYER.FOOD-- && PLAYER.HUNGER--
    - STEP = 30min
- BUY => PLAYER.MONEY-- && PLAYER.TICKETS++
    - STEP = 5min
- RAFFLE => rnd() > PLAYER.TICKETS / NPCs.TICKETS
    - STEP = 15min

