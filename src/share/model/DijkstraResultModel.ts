import {DijkstraModel} from "./DijkstraModel";
import {Point} from "./Point";

export class DijkstraResultModel {

    private readonly _dijkstraStepResults: Array<DijkstraModel>;
    private readonly _path: Array<Point>;

    constructor(dijkstraStepResults: Array<DijkstraModel>, path: Array<Point>) {
        this._dijkstraStepResults = dijkstraStepResults;
        this._path = path;
    }

    get dijkstraStepResults(): Array<DijkstraModel> {
        return this._dijkstraStepResults;
    }

    get path(): Array<Point> {
        return this._path;
    }
}