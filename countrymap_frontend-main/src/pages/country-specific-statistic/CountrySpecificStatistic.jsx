import react,{useEffect, useState} from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline, Grid, MenuItem, Select, Tooltip, Typography } from "@mui/material";
import theme from "../../config/theme";
import { Box } from "@mui/system";
import Header from "../../components/Header";
import Map from "../../components/country-specific-statistic/Map/Map";
import { countrydata, scale } from "../../data";
import CountryTable from "../../components/country-specific-statistic/Table/CountryTable";
import Chart from "../../components/country-specific-statistic/Chart";
import InfoIcon from "@mui/icons-material/Info";
import {api} from './constant';  
import groupBy from 'lodash.groupby';

const innerTheme = createTheme({
  ...theme,
  palette: {
    mode: "dark",
  },
});

const Home = () => {
const [List, setList] = useState(null)
const [List1, setList1] = useState(null)
const [intial, setIntial] = useState(null)
const [chartValue, setChartValue] = useState(null)
const [upperTable, setupperTable] = useState(null)
const [tableValue, setTableValue] = useState(null)
const [countryList, setCountryList] = useState([])
const [chartData, setChartData ] =useState(null)
const [mapData, setMapData ] =useState(null)



useEffect(() => {
      api.get('countrymap').then((res) => {
      setList(res.data);
      uniqueCountryName(res.data)
      })
      api.get('uppertable').then((res) => {
        setupperTable(res.data);
      })
      callingGraphData('Default Rate')
      callingMapData('Default Rate')
},[])
const callingGraphData = async(a)=>{
    await api.get(`graphdata/${a}`).then((res)=>{
          setChartData(res.data)
        })
}
const callingMapData = async(a)=>{
  
     await api.get(`mapdata/${a}`).then((res)=>{
        setMapData(res.data)
      })
}
const seprator = (s ,n)=>{
        const data = s?.map((item) => item[n])
        const newData = [...new Set(data)]
        return newData
}

const uniqueCountryName = (list)=>{
        const seps = seprator(list.excel , 'Country')
        const riskmetricsValues = seprator(list.dbData , 'riskmetrics')
        setCountryList(seps);
        const intialFilters = list.excel?.filter(lists =>lists.Country === seps[0])
        setIntial(intialFilters)
        setChartValue(list.dbData)
        const groupMapData = groupBy(list.excel, "Country")
        setList1(groupMapData)
}

const getRiskmetricsValue = (e)=>{
  const risk= e.target.value
  callingGraphData(risk)
}
const getRiskmetricsValues = (e)=>{
  const risk= e.target.value
  callingMapData(risk)
}
const getFilterData = (e)=>{
   const countryFilter = e.target.value
   const filters = List.excel?.filter(list =>list.Country === countryFilter)
   setTableValue(filters)
}
 console.log(List1);
  return (
    <ThemeProvider theme={innerTheme}>
      <CssBaseline />
      <Header />
      <Container>
        <Grid container sx={{ color: "#365893", mb: 4 }} spacing={{ xs: 2, md: 0.001 }}>
          {upperTable?.map((e,index)=>(
          <Grid item xs={12} md={4} key={index}>
            <Box p={2} bgcolor="#fff">
              <Typography variant="subtitle2" display="flex" alignItems="center">
                <span>{e.label}</span>
                <Tooltip title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. " arrow>
                  <InfoIcon sx={{ ml: 1, cursor: "pointer" }} fontSize="small" />
                </Tooltip>
              </Typography>
              <Typography variant="h6">{e.value}</Typography>
              <Typography variant="subtitle2" color="red">
                Up by {e.delta}% in 24 months
              </Typography>
            </Box>
          </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box mb={4}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1">Pick Country</Typography>
                <Select maxRows={10} defaultValue={"Austria"} onChange={getFilterData} size="small" sx={{ bgcolor: "#016287", width: "60%" }}>
                {countryList?.map((e,index)=>(
                  <MenuItem 
                  value={e}
                  key={index}
                  >{e}</MenuItem>
                ))}
                </Select>
              </Box>

              <Box bgcolor="#404040">
                <CountryTable data={tableValue? tableValue:intial} />
              </Box>
            </Box>

            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1">Pick Variable</Typography>
                <Select defaultValue={'Default Rate'} onChange={getRiskmetricsValue} size="small" sx={{ bgcolor: "#016287", width: "60%" }}>
                {chartValue?.map((e,index)=>(
                  <MenuItem 
                  value={e}
                  key={index}
                  >{e}</MenuItem>
                ))}
                </Select>
              </Box>

              <Box bgcolor="#404040" width="100%" height={250}>
                <Chart data={chartData}  />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1">Pick Variable</Typography>
                <Select defaultValue={'Default Rate'} onChange={getRiskmetricsValues} size="small" sx={{ bgcolor: "#016287", width: "60%" }}>
                {chartValue?.map((e,index)=>(
                  <MenuItem 
                  value={e}
                  key={index}
                  >{e}</MenuItem>
                ))}
                </Select>
              </Box>

              <Box p={6} bgcolor="#fff" height={540}>
                <Map data={countrydata} scale={scale} sdata={mapData} cdata={countryList} />
              </Box>
            </Box> 
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
