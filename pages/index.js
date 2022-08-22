import { Avatar, Badge, Box, Button, Chip, Container, Grid, IconButton, InputAdornment, Paper, Stack, Typography } from "@mui/material";
import { Header } from "../components"; 
import { BootstrapButton, CssTextField } from "../utils";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import styled from "@emotion/styled";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import { getListPost } from "../features/users/postAPI";
import { useEffect, useState } from "react";
import { defaultAvatarImage, defaultImage, listTypeAccount } from "../common/user"; 
import { linkImage } from "../features/Image";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { news } from "../common/post";
import { RenderModalFilterPost } from "../components/ModalFilterPost";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid #red`,
    padding: '0 4px',
    backgroundColor: 'rgb(254, 146, 146)',
    color: 'white'
  },
}));
let sortedBy = `[{"key":"STARTED_AT","reverse":false}]`
let sortedByReverse = `[{"key":"STARTED_AT","reverse":true}]`

const filterFormat = (filter) => {

  return "?" + new URLSearchParams(JSON.parse(JSON.stringify(filter))).toString();
} 

const objectLength = obj => Object.entries(JSON.parse(JSON.stringify(obj))).length;
export default function Home() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const {page,categoryId} = router.query; 
  const [state, setState] = useState([]); 
  const [valueSearch, setValueSearch] = useState("");
  const [filterWithType,setFilterWithType] = useState()
  const [loadMore, setLoadMore] = useState(false);  
  const [openModalFilter,setOpenModalFilter] = useState(false)
  const [filterModal,setFilterModal] = useState(JSON.parse(JSON.stringify({
    cityId: router.cityId || undefined,
    districtId: router.districtId || undefined,
    sortedBy: router.sortedBy || undefined
  })))
  const [end,setEnd] = useState(false)


  const [typePost, setTypePost] = useState({
    ...news,
    children: [
      {
        categoryId: 1,
        type: 2,
        text: "Tổ chức",
      },
      {
        categoryId: 1,
        type: 3,
        text: "Mạnh thường quân",
      },
    ],
  });  
  const [filter,setFilter] = useState({
    memberTypes: `[${[2,3].join(',')}]`,
    types: `[1]`,
    categoryId: 1,
    page: page || 1,
    size: 12,  
    ...router.query,
  });   

  const initFilter = {   
    page: page || 1,
    size: 12,   
  }
  useEffect(()=>{
    setFilter({
      ...filter
    }) 
  },[router.query,filterModal])

  const handleMouseDown =(event)=>{
    event.preventDefault(); 
  }
  const handleSetSearchValue = (e)=>{
    setValueSearch(e.target.value);
  } 
  const handleSearchListPost= ()=>{
    if(valueSearch && categoryId*1 === 1){ 
        reloadData({
        ...filter,
        page: 1, 
        creatorName: valueSearch, 
      })
      setFilter({
        ...filter,
        page: 1, 
        creatorName: valueSearch, 
      })
    }else if(valueSearch && categoryId*1 !== 1){
      delete filter.creatorName;
      reloadData({
        ...filter,
        page: 1, 
        title: valueSearch, 
      })
      setFilter({
        ...filter,
        page: 1, 
        title: valueSearch, 
      })
    }else {
      delete filter.creatorName;
      setFilter({
        ...filter,
        page: 1, 
      })
    } 
    router.replace(`/${filterFormat({...filter,page: undefined})}`)
  }
  const handleClearSearchListPost= ()=>{
    setValueSearch('');
    setEnd(false)
    delete filter.creatorName;
    delete filter.title;
    reloadData({
      ...filter, 
      page: 1
    })
    setFilter({
      ...filter, 
      page: 1
    })
  }   
  const handleSearchWithModal = (value)=>{   
    let result = JSON.parse(JSON.stringify({...value}));
    if(value.sortedBy === 1){
      result.sortedBy = sortedByReverse
    }else if(value.sortedBy === 2){
      result.sortedBy = sortedBy
    }  
    reloadData({
      ...filter, 
      ...result,
      page: 1
    })
    setFilter({
      ...filter, 
      ...result,
      page: 1
    })
    setFilterModal(JSON.parse(JSON.stringify({...value})));
  }
  const reloadData = (filter)=>{  
    setState([])  
    getListPost({filter: filterFormat({...filter, })}).then(
      res => setState(res?.data?.data)
    )
    setFilter({...filter,}); 
    router.replace({pathname: `/`, query: {...filter,}}, `/${filterFormat({...filter,})}`,{shallow: true})
  } 
  const handleClickTypeExtraPost =(value)=>{    
    delete filter.memberTypes;
    delete filter.types; 
    delete filter.title; 
    setEnd(false)
    if(value.categoryId === 1){
      if(filterWithType && filterWithType === value?.type) {
        delete filter.type; 
        setFilterWithType()
        reloadData({
          ...filter,  
          page: 1,
          isAvailable: 1
        })
        setFilter({
          ...filter, 
          type: value?.type, 
          page: 1,
          isAvailable: 1
        })
      }else{
        setFilterWithType(value.type) 
        reloadData({
          ...filter,  
          memberTypes: `[${value.type}]`,
          page: 1,
          isAvailable: 1
        })
      }
    } else if(filterWithType && filterWithType === value?.type) {
      delete filter.type; 
      setFilterWithType()
      reloadData({
        ...filter,  
        page: 1,
        isAvailable: 1
      })
      setFilter({
        ...filter, 
        page: 1,
        type: value?.type, 
        isAvailable: 1
      })
    }else{
      setFilterWithType(value.type) 
      reloadData({
        ...filter, 
        type: value?.type, 
        page: 1, 
        isAvailable: 1
      })
    }
  } 
  const handleFilter = (val)=>{   
    setEnd(false)
    setTypePost(val)
    setFilterWithType(); 
    setFilterModal({})
    setValueSearch('');
    delete filter.memberTypes;
    delete filter.types;
    delete filter.type;
    delete filter.sortedBy;
    delete filter.districtId;
    delete filter.title; 
    delete filter.cityId;
    if(val?.id === 1){ 
      reloadData({
        ...initFilter,
        ...filter,
        memberTypes: `[${[2,3].join(',')}]`,
        page: 1,
        categoryId: val?.id, 
      })
    }else{
          reloadData({
        ...initFilter,
        // memberTypes: `[${[2,3].join(',')}]`,
        page: 1,
        categoryId: val?.id,
        isAvailable: 1
      })
    }

    setFilter({
      ...filter, 
      page: 1,
      categoryId: val?.id,
      isAvailable: 1
    })
  } 
  const handleModalFilterOpen = ()=>{
    setOpenModalFilter(true)
  }
  const handleCloseModalFilter = ()=>{
    setOpenModalFilter(false)
  }
  const handleClearFilterModel = ()=>{
    delete filter.sortedBy;
    delete filter.districtId;
    delete filter.cityId;
    reloadData(filter)
  }
  
  return (
    <>
      <Header handleChange={handleFilter}/>
      <Container maxWidth="md">
        <Box sx={{ padding: "24px 0" }}>
          <Grid container spacing={2}>
          <Grid item xs={10}>
          <CssTextField
              fullWidth
              sx={{height: '30px', paddingRight: 0}}
              size="small"
              placeholder={categoryId*1 === 1 ?"Tên tổ chức / Mạnh thường quân": 'Tiêu đề'}
              value={valueSearch}
              onChange={handleSetSearchValue}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start" >
                    {valueSearch &&  <CloseIcon sx={{cursor: 'pointer'}} onMouseDown={handleMouseDown} onClick={handleClearSearchListPost}/>}
                      <SearchIcon sx={{cursor: 'pointer'}} onMouseDown={handleMouseDown} onClick={handleSearchListPost}/>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
            <Grid item xs={2}>
            <BootstrapButton onClick={handleModalFilterOpen} variant="contained" sx={{background: 'white', minWidth: 0, width: '50px', marginTop: 0}}>
                <StyledBadge badgeContent={objectLength(filterModal)} color="success">
                        <FilterAltIcon sx={{color: 'black'}} />
                      </StyledBadge>
              </BootstrapButton>
              <BootstrapButton variant="contained" sx={{background: 'white', minWidth: 0, width: '50px', marginLeft: '10px', marginTop: 0}}>
                <StyledBadge badgeContent={0} color="success">
                        <LocationOnIcon sx={{color: 'black'}} />
                      </StyledBadge>
              </BootstrapButton>
            </Grid>
          
          </Grid>
          <Box sx={{display: 'flex', gap: '10px'}}>
            
            {typePost?.children?.map(e => {
              return <BootstrapButton key={e?.type} onClick={() =>handleClickTypeExtraPost(e)} 
              variant="contained" 
              className={filterWithType === e?.type ? 'active-button' : ""} 
              sx={{ margin: "0", textTransform: 'initial', width: 'fit-content', lineHeight: '16px', background: 'white', color: 'black' }} size="small">
                {e?.text}
                </BootstrapButton>
            })} 
        </Box>  
        </Box>
          <Box className="wrapper-list-post">
              <Infinity end={end} setEnd={setEnd} state={state} setState={setState} filter={filter} loadMore={loadMore} setLoadMore={setLoadMore}/>
          </Box>
          <RenderModalFilterPost  filter={filterModal} setFilter={setFilterModal} handleSearch={handleSearchWithModal} clearFilter={handleClearFilterModel} isOpen={openModalFilter} handleClose={handleCloseModalFilter}/>
      </Container>
    </>
  );
}


const Infinity = (props) => {
  const router = useRouter()
  const { filter,loadMore,setLoadMore, end, setEnd } = props;
  const dataPost = props?.state; 
  const handleClickDetailPost = (id)=>{
    router.push(`/gift/${id}`)
  }

  useEffect(() => {  
    // if(props.state?.length > 0){
      getData(loadMore); 
    // } 
  }, [loadMore]);

  useEffect(() => {
    const list = document.getElementById('listPost') 
    if(props.scrollable) {   
      list.addEventListener('scroll', (e) => {
        const el = e.target;
        if(el.scrollTop + el.clientHeight === el.scrollHeight) { 
          setLoadMore(true);
        }
      });  
    } else {  
      window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight === list.clientHeight + list.offsetTop) {
          setLoadMore(true);
        }
      });
    } 
  }, []);

  useEffect(() => {
    const list = document.getElementById('listPost'); 
    if(list.clientHeight <= window.innerHeight && list.clientHeight) {
      setLoadMore(true);
    }
  }, [props.state]);

  const getData = (load) => {
    console.log(load,end)
    if (load && !end) {  
      if(props?.state?.length !== 0){
        filter.page++;
      }
      getListPost({filter: filterFormat({...filter,page: filter.page})})
      .then(res => { 
        props.setState([...props.state, ...res?.data?.data]);
        if(res?.data?.data?.length === 0 || res?.data?.data?.length < 12){
          setEnd(true)
        } 
        router.replace({pathname: `/`, query: filter}, `/${filterFormat({...filter})}`,{shallow: true})
        setLoadMore(false);
      }) 
    }
  };
  if(!props.state){
    return <>Loadding</>
  }
  return (
    <>
      <Grid container spacing={1} id="listPost">
        {dataPost?.map((e) => {
          const typeAccount = listTypeAccount.find(
            (t) => t.type * 1 === e?.creator?.type * 1
          );
          return (
            <Grid item xs={4} key={e?.id}>
              <Paper
                className="animate__animated animate__backInUp post-item-can-focus"
                variant="outlined"
                sx={{ cursor: "pointer", borderRadius: "10px" }}
              >
                <Box
                  sx={{
                    borderBottom: "1px solid #ddd",
                    borderRadius: "10px",
                  }}
                >
                  <Image
                    src={linkImage(e?.images?.image || defaultImage)}
                    width="340px"
                    height="260px"
                    objectFit="cover"
                    style={{ borderRadius: "10px" }}
                    alt="Image"
                    onClick={() => handleClickDetailPost(e?.id)}
                  />
                </Box>
                <Box sx={{ padding: "12px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Avatar
                        alt="Avatar"
                        sx={{
                          width: 56,
                          height: 56,
                          boxShadow: "0px 4px 10px #ddd",
                        }}
                        src={
                          e?.creator?.images?.avatar
                            ? linkImage(e?.creator?.images?.avatar)
                            : linkImage(defaultAvatarImage)
                        }
                        onClick={() => handleClickDetailPost(e?.id)}
                      ></Avatar>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                        onClick={() => handleClickDetailPost(e?.id)}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                        >
                          {e?.creator?.name}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Chip
                            size="small"
                            label={typeAccount?.text}
                            sx={{ background: typeAccount?.color }}
                          />
                        </Stack>
                      </Box>
                    </Box>
                  </Box>
                  <Box onClick={() => handleClickDetailPost(e?.id)}>
                    <Typography
                      variant="h6"
                      sx={{
                        minHeight: "50px",
                        fontWeight: "600",
                        fontSize: "18px",
                        margin: "10px 0 16px 0",
                      }}
                      className="text-two-line"
                    >
                      {e?.title}
                    </Typography>
                    <Typography variant="body2">
                      {moment(e?.updatedAt).format("HH:mm - DD/MM/yyyy") +
                        " - Toàn quốc"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          );
        })}

        <Grid item xs={12}>
          <Box sx={{ textAlign: "center", paddingTop: "10px" }}>
            <Button
              sx={{
                width: "100%",
                maxWidth: "300px",
                textTransform: "initial",
                margin: "0 auto 10px",
              }}
              variant="contained"
              size="small"
              disabled
            >
              {end ? 'Bạn đã xem đến cuối danh sách': 'Loading more ...'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
    
}