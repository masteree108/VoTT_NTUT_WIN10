import React from "react";
import _ from "lodash";
import { AssetService } from "../../../../services/assetService";
import ProjectService from "../../../../services/projectService";
import { IAssetMetadata,IProject } from "../../../../models/applicationState";


export interface ITrackingProps{
    project: IProject
    metadata: IAssetMetadata
}


/**
 * @name - Tracking Time Tool
 * @description - For user to enter the time and let them to decide how many seconds to track 
 */
export class TrackingTool extends React.Component <ITrackingProps>{
    
    public state = {
        trackingTime : 0,
        fps:0
    };
    trackTimeProp: number;
    assetService = new AssetService(this.props.project);
    projectService = new ProjectService();
    inputStyle = {
        margin:'5px',
        width: '50px',
        borderRadius:5
    };
    selectStyle = {
        margin:'5px',
        width: '80px',
        borderRadius:5
    };
    buttonStyle = {
        background: 'linear-gradient(#91919e,#8c8c8c)',
        borderRadius: '5px',
        fontFamily: 'Trebuchet MS',
        borderColor: 'transparent',
    };
    public render() {
        return (
            <div className="input-trackingbox" >
                <p style={{display:'inline-block'}}>Tracking Time:</p>
                <input 
                    type="text" 
                    style={this.inputStyle}
                    value={this.state.trackingTime}
                    onChange={e => this.setState({ trackingTime: e.target.value })}/>
                <p style={{display:'inline-block'}}>FPS:</p>
                <select style={this.selectStyle} value={this.state.fps} onChange={e => this.setState({ fps: e.target.value })}>
                    <option value="org">Org_FPS</option>
                    <option value="15">15 FPS</option>
                    <option value="6">6 FPS</option>
                    <option value="5">5 FPS</option>
                </select>
                <button style={this.buttonStyle} onClick={this.sendTime} >Auto Track</button>
            </div>
        );
    }

    private  sendTime = (event) => {
        this.setState({trackingTime: event.target.value});
        console.error(this.props.metadata);
        console.log(this.state.fps);
        this.assetService.getTrackTime(this.state.trackingTime.toString(), this.state.fps.toString(), this.props.metadata);
		this.projectService.saveTargetPath(this.props.project);
        console.warn("Tracking Time Tool: "  + this.state.trackingTime);
        this.state.trackingTime = 0;
    }
}
