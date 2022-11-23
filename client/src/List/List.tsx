import React from 'react';
import { Link } from "react-router-dom";
import { ComponentProps, Technology } from "./../Tools/data.model";

const List = ({ technologies }:ComponentProps) => {

    // ---------------------------------- render to the DOM
    return(
        <div className="flex flex-wrap">
            <div className="flex flex-col flex-nowrap pr-5">
                <div className="py-4">Click the technology name below to find out what courses require it:</div>

                {technologies.map((data:Technology, n:number) => 
                    <div key={n} className="ml-8 pl-2.5 py-0.5 border-l-4 border-solid border-accent">
                        <Link to={`/tech/${data._id}`} className="text-accent font-bold hover:underline">
                            {data.name}
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}

export default List;