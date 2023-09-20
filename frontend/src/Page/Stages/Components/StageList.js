import React, { useState } from "react";
import Card from "../../../Shared/Components/UIElements/Card";
import StageItem from "./StageItem";

const StageList = (props) => {
    if (props.items.length === 0) {
        return (
          <div className="center">
            <Card>
            <h2>Aucun stage trouvé</h2>
            </Card>    
          </div>
        );
      }
    
      return (
        <ul className="user-list">
          {props.items.map(stage => (
            <StageItem
              key={stage.id}
              id={stage.id}
              titre={stage.titre}
              description={stage.description}
            />
          ))}
        </ul>
      );
};

export default StageList