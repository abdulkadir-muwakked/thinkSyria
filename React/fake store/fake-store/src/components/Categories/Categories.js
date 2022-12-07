import  { Box, Grid }  from '@mui/material';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useState } from 'react';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: "black",
    textTransform: "capitalize",
    borderRadius: 0,
    borderBottom: "solid black .5px",
    cursor: "pointer",
    "&:hover" :{
        backgroundColor : "#0275d8",
        color: "white"
    }
  }));

const Categories = ({items, handelOnChangeCategoryId, style}) => {

    const [selectItem, setSelectItem] = useState(items.length)
    
    return(
        <Box sx={{
            ...style
        }}>
            <Grid container direction={"column"}>
            { items?.length > 0 && items?.map((item) =>(
                <Grid  key={item.id} item>
                    <Item sx={{
                        backgroundColor:  item.id == selectItem ? "#0275d8": "white",
                        color:  item.id == selectItem ? "white": "black"
                    }} onClick={() => {
                        setSelectItem(item.id)
                        handelOnChangeCategoryId(item.id)
                        }}>{item.name}</Item>
                   
                </Grid>
            ))}
            </Grid>
        </Box>
    )
}

export default Categories