import { TWO_IN_ONE } from "../constants";
import { AnimatorSequencersApplier } from "../AnimationSequencer/AnimationSequencer";
import { PauseWhite } from "../layers/PauseWhite";
import { AnimationTemplate } from "./AnimationTemplate";

const sequencerConfigurations = [
    [
        {
            animators: [PauseWhite],
            repetitions: 5,
        },
    ],
]

export class PauseWhiteAnimation extends AnimationTemplate {
    public NAME = "Pause white";

    constructor() {
        super();
        this.animationSequencer = new AnimatorSequencersApplier({
            background: TWO_IN_ONE,
            sequencerConfigurations,
        })
    }    
}