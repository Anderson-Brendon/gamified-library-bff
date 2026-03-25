export default interface IBook {
    id: number,
    title: string,
    description: string,
    releaseYear: number,
    cover: string,
    pdf: string,
    slug: string,
    author: {
        id: number,
        name: string
    },
    genre:{
        id: number,
        name: string
    }
    averageRating: number
}

export interface IBookCard {
    id: number,
    title: string,
    cover: string,
    slug: string
}

export interface IBookOnReadingList {
    id: number,
    title: string,
    cover: string,
    slug: string,
    currentPage: number,
    isComplete: boolean
}