import React from 'react';
import { useParams , useNavigate} from "react-router-dom";
import { ComponentProps, Technology , Course} from "./../Tools/data.model"

const Tech = ({ technologies }:ComponentProps) => {
    
    // get the id route parameter passed to this component
    let { id } = useParams<{id:string}>();
    const navigate = useNavigate();
    // console.log("id: " + id);

    // find the technology we want to display based off of id
    // let technology:(Technology | undefined) = technologies.find(item => {
    //     return (item._id === id)
    // });
    let technology:(Technology | undefined) = technologies.find(item => item._id === id);

    function RatingLoop() {
        const rows = [];
        if (technology !== undefined) {
             for (let i = 0; i < 5; i++) {
               if (i < technology.difficulty ) {
                   rows.push( <i className="fas fa-square text-accent pr-0.5"></i>   );
               } if  (i >= technology.difficulty ){
                   rows.push(  <i className="fas fa-square text-greyed-out pr-0.5"></i> );
              } 
             }
            return <div>{rows}</div>;
             }
        }


    // ---------------------------------- render to the DOM
    return(
        (technology !== undefined) ?
        <div className="pt-2">
            <div className="font-bold"><i className="fas fa-arrow-left content__button pr-2 text-xl hover:text-accent" onClick={() => navigate(-1)}></i>Details for {technology.name}</div>
            <div className="max-w-3xl pb-4">{technology.description}</div>
        
            <div className="pb-1">Difficulty:</div>
            <div className="pb-2">            
                {  RatingLoop() }
            </div>
        
            <div className="py-2">Required in courses:</div>
            
            {/* <div> below to be rendered For each course */}
            <div className="ml-8 pl-2.5 py-2 border-l-4 border-solid border-accent">
                <div className="font-bold">
                
                {technology.courses.map((data:Course, n:number) => 
                 <div key={n}>
                        {data.code}
                  </div>
                )}
        
                </div>
            </div>
        </div>
        :
        <div className="pt-2">
            <div className="font-bold"><i className="fas fa-arrow-left content__button pr-2 text-xl hover:text-accent"></i>Error :(</div>
            <div className="max-w-3xl pb-4">The requested technology does not exist in the database</div>
        </div>
    );
}

export default Tech;