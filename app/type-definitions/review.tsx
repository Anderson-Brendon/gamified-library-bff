export interface IReview {
    user:{
        username: string,
        profilePic: string
    },
    comment: string,
    rate: number
}

export interface IReviewUpload {
    comment: string,
    rate: number
}