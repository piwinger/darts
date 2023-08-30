import { Injectable } from '@nestjs/common';

const CHANCES = Object.freeze(
    {
        lost: 0,
        tied: 0.5,
        won: 1
    });

const MAGIC = 400;

@Injectable()
export class EloRankingService {

    kFactor: number = 32;

    constructor() { }

    private odds(rating, opponentRating) {
        var difference = opponentRating - rating;

        return 1 / (1 + Math.pow(10, difference / MAGIC));
    }

    ifWins(rating, opponentRating) {
        var odds = this.odds(rating, opponentRating);

        return this.processRating(odds, CHANCES.won);
    }


    ifLoses(rating, opponentRating) {
        var odds = this.odds(rating, opponentRating);

        return this.processRating(odds, CHANCES.lost);
    }

    processRating(odds, actualScore) {
        var difference = actualScore - odds;
        var rating = Math.round(this.kFactor * difference);

        return rating;
    }

}
