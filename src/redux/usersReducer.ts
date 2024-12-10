export type UserFromData = {
    name: string
    id: number
    photos: Photos
    status: any
    followed: boolean
}

export type Photos = {
    small: any
    large: any
}

const initialState = {
    users: <UserFromData[]>[],
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    isFetching: true,
}

type InitialState = typeof initialState

export const usersReducer = (state: InitialState = initialState, action: UsersAction): InitialState => {
    switch (action.type) {
        case 'FOLLOW':
        case 'UNFOLLOW': {
            const {userId, isFollowed} = action.payload;
            return {...state, users: state.users.map(user => user.id === +userId ? {...user, followed: isFollowed} : user)};
        }
        case 'SET_USERS': {
            return {...state, users: action.payload.users};
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.payload.currentPage};
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalCount: action.payload.totalCount};
        }
        case 'TOGGLE_FETCHING': {
            return {...state, isFetching: action.payload.isFetching};
        }
        default:
            return state
    }
}

export const followAC = (payload: {userId: number, isFollowed: boolean}) => {
    return {type: 'FOLLOW', payload} as const
}
export const unFollowAC = (payload: {userId: number, isFollowed: boolean}) => {
    return {type: 'UNFOLLOW', payload} as const
}
export const setUsersAC = (payload: {users: UserFromData[]}) => {
    return {type: 'SET_USERS', payload} as const
}

export const setCurrentPageAC = (payload: {currentPage: number}) => {
    return {type: 'SET_CURRENT_PAGE', payload} as const
}

export const setTotalUsersCountAC = (payload: {totalCount: number}) => {
    return {type: 'SET_TOTAL_USERS_COUNT', payload} as const
}

export const toggleFetchingAC = (payload: {isFetching: boolean}) => {
    return {type: 'TOGGLE_FETCHING', payload} as const
}

export type FollowACType = ReturnType<typeof followAC>
export type UnFollowACType = ReturnType<typeof unFollowAC>
export type SetUsersACType = ReturnType<typeof setUsersAC>
export type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>
export type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>
export type ToggleFetchingACACType = ReturnType<typeof toggleFetchingAC>

type UsersAction = FollowACType | UnFollowACType | SetUsersACType | SetCurrentPageACType | SetTotalUsersCountACType | ToggleFetchingACACType


// const imgSrc = 'https://avatars.mds.yandex.net/i?id=39012a20de9d0577cc073dc266d44100_l-5278064-images-thumbs&n=13'

// type UserLocation = {
//     city: string,
//     country: string
// }

// export type User = {
//     id:string,
//     fullName: string,
//     status: string,
//     location: UserLocation,
//     followed: boolean,
//     src: string
// }


// {
//     const {userId, isFollowed} = action.payload;
//     return {...state, users: state.users.map(user => user.id === userId ? {...user, followed: isFollowed} : user)};
// }

// {
//     id: v1(),
//     fullName: "Elizabet",
//     status: 'Big-Boss',
//     location: {
//         city: 'Moscow',
//         country: 'RF'
//     },
//     followed: true,
//     src: imgSrc
// },
// {
//     id: v1(),
//     fullName: "Mary",
//     status: 'Boss',
//     location: {
//         city: 'Moscow',
//         country: 'RF'
//     },
//     followed: true,
//     src: imgSrc
// },
// {
//     id: v1(),
//     fullName: "John",
//     status: 'Worker',
//     location: {
//         city: 'Minsk',
//         country: 'Belarus'
//     },
//     followed: false,
//     src: imgSrc
// },