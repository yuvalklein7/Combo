import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import '../CSS/Search.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import chartGif from '../../assets/Chart.gif'
import chartPNG from '../../assets/Chart.png'
import { drugsListALL } from "../../assets/AllDrugs";
import { drugsList } from "../../assets/DrugList";
import DataTable from "../../components/JS/DataTable";
import KeyMes from "../../components/JS/KeyMes";
export default function Search() {
    let { value } = useParams()
    const { state } = useLocation()
    const [isFav, setIsFav] = useState(false)
    const [imgSrc, setImgSrc] = useState(chartPNG)
    const [years, setYears] = useState([])
    const navigate = useNavigate();
    const [armsView, setArmsView] = useState(true)


    // Parameters for filtered by arms:

    const [tableRowsArms, setTableRowsArms] = useState([])
    const [totslStudies, setTotalStudies] = useState(0);
    const [retStudies, setRetStudies] = useState(0);
    const [retTime, setRetTime] = useState('')
    const [yearsFilteredArms, setYearsFilteredArms] = useState(0)

    // Parameters for all-the naive first algorithm:

    const [tableRowsAll, setTableRowsAll] = useState([])
    const [totslStudiesAll, setTotalStudiesAll] = useState(0);
    const [retStudiesAll, setRetStudiesAll] = useState(0);
    const [retTimeAll, setRetTimeAll] = useState('')
    
    const searchOccurance = (data, field) => {
        let res = [];
        let tempTreatment = [];
        let tempYearsFiltered = 0;
        data.forEach(arms => {
            let flag = (arms.StartDate[0] !== undefined);
            if (flag) {
                let allDate = arms.StartDate[0].split(/[-+:_"\s",]/);
                flag = (Number(allDate[allDate.length - 1]) > state[0] && Number(allDate[allDate.length - 1]) < state[1])
            }
            if (flag) {
                arms[field].forEach(element => {
                    // maybe need to rethink because not neceesary we want to add multiple occurances for same study, even on different arms
                    if (!(element.includes(' or ') || element.includes('/')) || field === "InterventionDescription") {
                        element.replaceAll(/[®㎡◦•()/]/g, '').split(/[-+:_"\s",]/).forEach(treatment => {
                            // treatment = treatment.charAt(0).toUpperCase() + treatment.slice(1);
                            treatment=treatment.toUpperCase()
                            // if (drugsList.findIndex(el => el.includes(treatment)) !== -1)
                            if (drugsListALL.includes(treatment))
                                if (!tempTreatment.includes(treatment))
                                    tempTreatment.push(treatment);
                        });
                        if (tempTreatment.length !== 0) {
                            // console.log(getAllSubsets(tempTreatment));
                            res.push([tempTreatment, [arms['NCTId'], arms["BriefTitle"]]])
                        };
                        tempTreatment = [];
                    }
                })
            }
            else {
                tempYearsFiltered += 1
            }
        })
        let finalRes = new Map();
        res.forEach(combination => {
            let tempLen = combination[0].length;
            let tempCombination = JSON.stringify(combination[0].sort()).replaceAll(/[\[\]'\"]+/g, '')
            if (!finalRes.has(tempCombination)) {
                finalRes.set(tempCombination, [1, tempLen, [[combination[1][0][0], combination[1][1][0]]]]);
            }
            else {
                finalRes.set(tempCombination, [(finalRes.get(tempCombination)[0] + 1), finalRes.get(tempCombination)[1], [...finalRes.get(tempCombination)[2], [combination[1][0][0], combination[1][1][0]]]],)
            }
        })
        let count = 1;
        let rows = [];
        finalRes.forEach((value, key) => {
            rows.push({ id: count, drugs: key.replaceAll(',', '+'), drugsCount: value[1], occurance: value[0], trials: value[2] })
            count += 1;
        });
        if (field === "ArmGroupLabel") {
            setTableRowsArms(rows);
            setYearsFilteredArms(tempYearsFiltered)
        }
        else {
            setTableRowsAll(rows);
        }

    }
    const getData = async (field) => {
        let linkForStudy = 'https://clinicaltrials.gov/ct2/show/'
        const start = new Date();
        let temp_value = value.replaceAll(' ', '+');
        if (!temp_value.includes('combination'))
            temp_value = temp_value + "+combination"
        let tempTotalStudies = 0;
        let max_rnk = 1000;
        let min_rnk = 1;
        let total_data = [];
        while (true) {
            await fetch(`https://www.clinicaltrials.gov/api/query/study_fields?expr=${temp_value}&min_rnk=${min_rnk}&max_rnk=${max_rnk}&fields=${field},StartDate,NCTId,BriefTitle&fmt=JSON`)
                .then(response => response.json())
                .then(data => {
                    data.StudyFieldsResponse.StudyFields.forEach(e =>
                        total_data.push(e)
                    )
                    tempTotalStudies = data.StudyFieldsResponse.NStudiesAvail
                    max_rnk = data.StudyFieldsResponse.NStudiesFound;
                })
            min_rnk += 1000;
            if (min_rnk > max_rnk) {
                break
            }
            else {
                if (max_rnk > min_rnk + 999)
                    max_rnk = min_rnk + 999
            }
        }
        if (field === "ArmGroupLabel") {
            searchOccurance(total_data, field);
            setRetStudies(max_rnk);
            setTotalStudies(tempTotalStudies);
            setRetTime(new Date() - start);
            setYears(state)
        }
        else {
            searchOccurance(total_data, field)
            setRetStudiesAll(max_rnk);
            setTotalStudiesAll(tempTotalStudies);
            setRetTimeAll(new Date() - start);
        }
    }

    const set_data = async () => {
        setTableRowsArms(state.val)
        setRetTime(state.keyMes.retTime * 1000) //*1000 is to read it the same for both cases (i.e from fav or new)
        setTotalStudies(state.keyMes.studiesNum)
        setRetStudies(state.keyMes.studiesRet);
        setYears(state.years)
    }

    useEffect(() => {
        if (state.val !== undefined)
            set_data();
        else {
            getData("ArmGroupLabel");
            getData("InterventionDescription");
        }
    }, [])

    return (
        <div className="search-page-content">
            <div className="header-section">
                <div className="search-header">
                    <Button variant="outlined" onClick={() => { navigate(`../`, { replace: true }) }} ><ArrowBackIcon />back</Button>
                    <Typography variant="h4" className="search-header-text">Result for: {value}</Typography>
                    <span className="actions-chart">
                        <span className="chart-img" onClick={() => { setArmsView(!armsView) }} onMouseOver={() => setImgSrc(chartGif)} onMouseLeave={() => setImgSrc(chartPNG)} ><Tooltip title="Switch View">
                            <img class="chart-static" src={imgSrc} /></Tooltip>
                        </span>
                        <Tooltip title={isFav ? "Remove Mark" : "Mark Favorite"}><IconButton onClick={() => { setIsFav(!isFav) }}><BookmarkAddIcon fontSize="large" color={isFav ? "primary" : ""} /></IconButton></Tooltip>
                    </span>
                </div>
            </div>
            <div className="table-section">
                {tableRowsArms.length === 0 || tableRowsAll.length === 0 ? <div className="search-loader"><CircularProgress size='40vh' thickness='1.5' /> </div> :
                    <div className="table-section-content">
                        <div className="result-sum">
                            <Typography variant="h6"> Key Measurments {armsView ? '- Arms' : '- All'}</Typography>
                            {armsView ?
                                <KeyMes totslStudies={totslStudies} retStudies={retStudies} yearsFiltered={yearsFilteredArms} years={years} retTime={retTime} />
                                :
                                <KeyMes totslStudies={totslStudiesAll} retStudies={retStudiesAll} yearsFiltered={yearsFilteredArms} years={years} retTime={retTimeAll} />}
                        </div>
                        {armsView ?
                            <DataTable tableRows={tableRowsArms} />
                            :
                            <DataTable tableRows={tableRowsAll} />
                        }
                    </div>}
            </div>
        </div>
    )

}