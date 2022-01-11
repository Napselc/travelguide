import { Activity } from "../shared/activity.model"

export class Trip{
    public name: string
    public description: string
    public image: string
    public activities: Activity[]

    constructor(name:string,description:string,image:string,activities: Activity[]){
    // constructor(name:string,description:string,image:string){    

        this.description = description
        this.name = name
        this.image = image
        this.activities = activities

    }

}