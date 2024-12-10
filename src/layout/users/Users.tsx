import s from './Users.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import type {RootState} from "../../redux/redux-store";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC, toggleFetchingAC,
    unFollowAC,
    UserFromData
} from "../../redux/usersReducer";
import {CircularProgress} from "@mui/material";
import {NavLink} from "react-router-dom";
import {usersApi} from "../../api/api.ts";


const imgSrc = 'https://avatars.mds.yandex.net/i?id=39012a20de9d0577cc073dc266d44100_l-5278064-images-thumbs&n=13'

export const Users = () => {
    const dispatch = useDispatch();

    const users = useSelector<RootState, UserFromData[]>((state) => state.users.users);
    const pageSize = useSelector<RootState, number>((state) => state.users.pageSize);
    const totalUserCount = useSelector<RootState, number>((state) => state.users.totalCount);
    const currentPage = useSelector<RootState, number>((state) => state.users.currentPage);
    const isFetching = useSelector<RootState, boolean>((state) => state.users.isFetching);

    const pagesCount = totalUserCount ? Math.ceil(totalUserCount / pageSize) : 1;

    const follow = (userId: number) => {
        usersApi.followUsers('post',{ userId}).then(res => {
            if (res.resultCode === 0) {
                dispatch(followAC({userId, isFollowed: true}));
            }
        })
    }

    const unFollow = (userId: number) => {
        usersApi.unFollowUsers('delete',{ userId}).then(res => {
            if (res.resultCode === 0) {
                dispatch(unFollowAC({userId, isFollowed: false}))
            }
        })
    }

    const setCurrentPage = (value: number) => {
        dispatch(setCurrentPageAC({currentPage: value}))
    }

    const pages = [];
    if (pagesCount > 1) {
        for (let i = 0; i < 10; i++) {
            pages.push(i + 1)
        }
    }

    function fetchUsers() {
        usersApi.getUsers({currentPage, pageSize}).then(res => {
            if (res.items) {
                dispatch(setUsersAC({users: res.items}))
                dispatch(setTotalUsersCountAC({totalCount: res.totalCount}))
                dispatch(toggleFetchingAC({isFetching: false}))
            } else {
                dispatch(toggleFetchingAC({isFetching: true}))
            }
        })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            {isFetching && <CircularProgress size="3rem"/>}
            <ul style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: "center",
                gap: '20px',
                marginBottom: '15px'
            }}>
                {pages.map(btn => {
                    return (
                        <li key={btn}>
                            <button onClick={() => setCurrentPage(btn)} className={s.button}>Page : {btn} </button>
                        </li>
                    )
                })
                }
            </ul>
            <ul>
                {users?.map((user: UserFromData) => {

                    const subscribeHandler = ()=> {
                        if (user.followed) {
                            unFollow(user.id)
                            return
                        }
                        follow(user.id)
                    }
                    const followBtnText = user.followed ? 'unFollow' : 'Follow'

                    return (
                        <li key={user.id} className={s.userItem}>
                            <h2>{user.name}</h2>
                            <div className={s.userImg}>
                                <NavLink to={`/profile/${user.id}`}>
                                    <img src={user.photos.small ? user.photos.small : imgSrc} alt={user.name}/>
                                </NavLink>
                            </div>
                            <h3>{user.status ? user.status : `${user.name} пока без статуса`}</h3>
                            <div className={s.userButton}>
                                <button onClick={subscribeHandler}
                                        className={s.button}>{followBtnText}</button>
                            </div>
                        </li>
                    )
                    }
                )
                }
                    </ul>
                    </>
                    );
                };

// const setUsers = () => {
//     axios.get('https://social-network.samuraijs.com/api/1.0/users').then(res => {
//         dispatch(setUsersAC({users: res.data.items}))
//     })
// }