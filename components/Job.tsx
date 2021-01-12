import React from "react";
import Card from "../metrum/Card";
import Typography from "../metrum/Typography";
import Link from "../metrum/Link";

export interface IJob {
    id: string;
    name: string;
    location: ILocation;
}

interface ILocation {
    city: string;
}

type JobProps = IJob

const Job: React.FunctionComponent<JobProps> = ({ id, name, location }) => {
    const link = `https://www.smartrecruiters.com/Allegro/${id}-${slugify(name)}?trid=de9dfdf3-7f9e-4ebf-8a64-49f6c69ad640`;
    return (
        <Card as="article" className="m-margin-bottom_16 m-display-flex m-flex-justify_between">
            <Typography
                className="m-margin-right_0 m-margin-bottom_0 m-margin-left_0 m-color_text m-font-size_21 m-font-size_25_sm m-font-weight_300 m-line-height_normal m-margin-top_16 m-flex-grow_1">{name}</Typography>
            <Typography
                className="m-margin-right_0 m-margin-bottom_0 m-margin-left_0 m-color_text m-font-size_21 m-font-size_25_sm m-font-weight_300 m-line-height_normal m-margin-top_16 m-text-align_left">{location.city}</Typography>
            <Link className="m-margin-left_16 m-text-transform_uppercase" href={link}>sprawdź</Link>
        </Card>
    );
};

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export default Job;
