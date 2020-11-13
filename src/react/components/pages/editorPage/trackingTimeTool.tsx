import React from "react";
import _ from "lodash";
import { AssetService } from "../../../../services/assetService";
import { IAssetMetadata,IProject } from "../../../../models/applicationState";


export interface ITrackingTimeProps{
    project: IProject
    metadata: IAssetMetadata
}


/**
 * @name - Tracking Time Tool
 * @description - For user to enter the time and let them to decide how many seconds to track 
 */
export class TrackingTimeTool extends React.Component <ITrackingTimeProps>{
    
    public state = {
        trackingTime : 0,
    };
    trackTimeProp: number;
    assetService = new AssetService(this.props.project);

    public render() {
        return (
            <div className="input-trackingbox" >
                <input 
                    type="text" 
                    value={this.state.trackingTime}
                    onChange={e => this.setState({ trackingTime: e.target.value })}/>
                <button onClick={this.sendTime} >auto track</button>
            </div>
        );
    }

    private  sendTime = (event) => {
        this.setState({trackingTime: event.target.value});
        console.error(this.props.metadata);
        this.assetService.getTrackTime(this.state.trackingTime.toString(), this.props.metadata);
        console.warn("Tracking Time Tool: "  + this.state.trackingTime);
        this.state.trackingTime = 0;
    }
}
