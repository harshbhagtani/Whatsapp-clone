
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { Delete, MoreVert } from "@material-ui/icons";



import { useDispatch } from "react-redux";
import db from "./firebase";





const EditButton = ({ id }) => {
    // console.log(row);
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
        display: "flex",
        alignItems: "flex-start",
      },
      primaryColor: {
        color: 'black',
      },
      menuItem: {
        margin: "0 auto",
        width: "95%",
        borderBottom: `2px solid black`,
        "&:last-child": {
          borderBottom: "none",
        },
      },
    }));
  
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();
  
    const [cardAnchor, setCardAnchor] = useState(null);
    const [cardOpen, setCardOpen] = useState(false);
  
    const cardOptions = [
     
      {
      
    
            icon:<Delete/>,
            label: "Delete",
            redirectHandler: () => {
              db.collection('rooms').doc(id).delete().then(()=>{
                    history.push('/');
                    alert('Room deleted');
                   
            
            });
         
            },
          
      },
    ];
  
    const handleCardOptionsOpen = (e) => {
      setCardOpen(true);
      setCardAnchor(e.currentTarget);
    };
  
    const handleCardOptionsClose = () => {
      setCardOpen(false);
      setCardAnchor(null);
    };
  
    return (
      <>
        <IconButton size="small" onClick={handleCardOptionsOpen} style={{ position: "absolute", top: "10px", left: "80%" }} >
          <MoreVert className={classes.primaryColor} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={cardAnchor}
          keepMounted
          open={Boolean(cardAnchor)}
          onClose={handleCardOptionsClose}
          style={{ marginTop: "3rem" }}
        >
          {cardOptions.map((option, idx) => (
            <MenuItem
              key={idx}
              className={classes.menuItem}
              onClick={option.redirectHandler}
            >
              {option.icon}{" "}
              <p >
                {option.label}
              </p>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  export default EditButton;