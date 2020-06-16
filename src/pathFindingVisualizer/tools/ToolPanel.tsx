import React, {Component, ReactElement} from "react";
import "./ToolPanel.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRight, faBullseye, faEraser, faPause,
    faPencilAlt, faPlay, faStepBackward, faStepForward
} from "@fortawesome/free-solid-svg-icons";
import {ActionEnum} from "../../share/enum/ActionEnum";

export interface IToolPanelProps {
    speed: number;
    steps: number;
    isPlaying: boolean;
    onSpeedChange: (value: number) => void;
    onAction: (action: ActionEnum) => void;
    onPlay: () => void;
}

export class ToolPanel extends Component<IToolPanelProps, {}> {

    private playButtonRender = (): ReactElement => {

        const playButton: ReactElement = (
            <button className="btn btn-outline-secondary"
                    onClick={() => this.props.onPlay()}
            >
                <FontAwesomeIcon icon={faPlay} size="sm"/>
                <span>play</span>
            </button>
        );

        const pauseButton: ReactElement = (
            <button className="btn btn-outline-secondary"
                    onClick={() => this.props.onPlay()}
                    disabled={this.props.isPlaying}
            >
                <FontAwesomeIcon icon={faPause} size="sm"/>
                <span>pause</span>
            </button>
        );

        return this.props.isPlaying ? pauseButton : playButton;
    }

    render = (): ReactElement => {
        return (
            <div className="card tool">
                <div className="card-header">
                    Tools
                </div>
                <div className="card-body">
                    <div className="row">

                        <div className="col-5">
                            <div className="row">

                                <div className="col-3">
                                    <button type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => this.props.onAction(ActionEnum.wall)}
                                            disabled={this.props.isPlaying}
                                    >
                                        <FontAwesomeIcon icon={faPencilAlt} size="sm"/>
                                        <span>Wall</span>
                                    </button>
                                </div>

                                <div className="col-3">
                                    <button type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => this.props.onAction(ActionEnum.clean)}
                                            disabled={this.props.isPlaying}
                                    >
                                        <FontAwesomeIcon icon={faEraser} size="sm"/>
                                        <span>clean</span>
                                    </button>
                                </div>

                                <div className="col-3">
                                    <button className="btn btn-outline-secondary"
                                            onClick={() => this.props.onAction(ActionEnum.start)}
                                            disabled={this.props.isPlaying}
                                    >
                                        <FontAwesomeIcon icon={faArrowRight} size="sm"/>
                                        <span>start</span>
                                    </button>
                                </div>

                                <div className="col-3">
                                    <button className="btn btn-outline-secondary"
                                            onClick={() => this.props.onAction(ActionEnum.end)}
                                            disabled={this.props.isPlaying}
                                    >
                                        <FontAwesomeIcon icon={faBullseye} size="sm"/>
                                        <span>end</span>
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className="col-7">
                            <div className="row">

                                <div className="col-2">
                                    { this.playButtonRender()}
                                </div>

                                <div className="col-2">
                                    <button className="btn btn-outline-secondary"
                                            disabled={true}
                                    >
                                        <FontAwesomeIcon icon={faStepBackward} size="sm"/>
                                        <span>prev</span>
                                    </button>
                                </div>

                                <div className="col-3">
                                    <input id="steps"
                                           readOnly={true}
                                           className="form-control form-control-sm"
                                           type="number"
                                           min="0"
                                           value={this.props.steps}/>
                                </div>

                                <div className="col-2">
                                    <button className="btn btn-outline-secondary"
                                            disabled={true}
                                    >
                                        <FontAwesomeIcon icon={faStepForward} size="sm"/>
                                        <span>next</span>
                                    </button>
                                </div>

                                <div className="col-3">
                                    <div className="form-group row">
                                        <div className="col-7">
                                            <input id="time"
                                                   className="form-control form-control-sm"
                                                   type="number"
                                                   min="0"
                                                   disabled={this.props.isPlaying}
                                                   value={this.props.speed}
                                                   onChange={(value) => this.props.onSpeedChange(Number(value.target.value))}
                                            />
                                        </div>
                                        <label htmlFor="time" className="col-5">ms</label>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}