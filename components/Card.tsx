import * as React from "react";
import CardComp from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import Button, { ButtonCompProps } from "@components/Button";

interface CardProps {
  title: string;
  subTitle: string;
  tooltipText: string;
  btnTitle: string[];
  btnAction?: (() => any | undefined)[];
  btnProps?: (ButtonCompProps | undefined)[];
}

const Card: React.FC<CardProps> = ({
  subTitle,
  title,
  tooltipText,
  btnTitle,
  btnAction = [],
  btnProps = [],
}) => {
  return (
    <CardComp>
      <CardContent>
        <Tooltip title={tooltipText}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Tooltip>
        <Typography variant="caption" color="text.secondary">
          {subTitle}
        </Typography>
      </CardContent>
      <CardActions>
        {
          btnTitle.map((title, idx) => (
            <Button
              key={idx}
              onClick={btnAction[idx]}
              size="small"
              {...btnProps[idx]}
            >
              {title}
            </Button>
          ))
        }
      </CardActions>
    </CardComp>
  );
};

export default Card;
