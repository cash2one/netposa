import {Wifi} from "../entity/Wifi";
import {ElectronicFence} from "../entity/ElectronicFence";
import {Camera} from "../entity/Camera";
import {RmpGate} from "../entity/RmpGate";

export class LampWithDevice{
    WiFi:Array<Wifi>;
    ElectronicFence:Array<ElectronicFence>;
    Camera:Array<Camera>;
    RmpGate:Array<RmpGate>;
}
export class LampWithDeviceID{
    WiFi:Array<string> = [];
    ElectronicFence:Array<string>= [];
    Camera:Array<string>= [];
    RmpGate:Array<string>= [];
}