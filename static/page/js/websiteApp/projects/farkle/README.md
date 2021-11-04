#Farkle Bot

This is a bot which advises you on the optimal strategy for the dice game Farkle. The game has two states: your score
for the current turn, and the number of dice you have left to roll. These together create a value to the game state
which will advise you on if you should continue to roll or if the risk is too high and it is time to stop, and it also
advises you on the optimal move to make when more than one is possible.

While the moves this bot adivses ***ARE*** optimal, they are not significantly better than a novice player and cannot be
guarenteed to win Farkle any percentage of the time due to the game being so subject to luck. The equations I developed
for the values of the game states are derived from information in
[this](http://www.ryanhmckenna.com/2018/07/optimal-strategy-for-farkle-dice.html) blog post. There is more info about
the AI at [joshbedwell.com/projects/farklebot](joshbedwell.com/projects/farklebot).
