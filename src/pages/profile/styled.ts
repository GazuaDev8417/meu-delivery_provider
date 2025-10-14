import styled from 'styled-components'




export const Container = styled.div`
    margin-top: 12vh;

    h1{
        text-align: center;
        margin: 5vh 0 3vh;
    }
    .card{
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid red;
        width: 70vw;
        margin: 0 auto 10vh;
    }

    .image{
        /* width: 50vw;
        height: 50vh; */
        margin-top: 20px;
        box-shadow: 2px 2px 4px;
        border-radius: 10px;
    }

    .desc{
        margin: 30px 20px;
    }

    .rest-name{
        text-align: center;
        font-size: 1.5rem;
        margin: 20px 10px 10px;
    }

    .menuTitle-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 80%;
    }

    .icon{
        cursor: pointer;
    }

    .products{
        border-bottom: 1px solid gray;
        text-align: center;
        padding: 10px;
        margin: 10px;
    }

    .product-desc{
        margin: 10px;
    }

    .products-container{
        max-height: 400px;
        overflow-y: auto;
    }

    .categories-bar {
        display: flex;
        gap: 1rem;
        overflow-x: auto;
        padding: 0.5rem 0;
        border-bottom: 1px solid #ddd;
    }

    .categories-bar h3 {
        white-space: nowrap;
        cursor: pointer;
        transition: color 0.2s;
    }

    @media(hover: hover) and (pointer: fine){
        .categories-bar h3:hover {
            color: red !important;
        }
    }

    .products-card{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 20px;
        border: 1px solid;
        border-radius: 10px;
        box-shadow: 2px 2px 4px;
        margin: 10px;
        padding: 10px;
    }

    .product-image{
        /* width: 100px;
        height: 130px; */	
        border-radius: 10px;
        /* box-shadow: 2px 2px 4px; */
    }

    .select-btn-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .products-card button{
        padding: 10px;
        color: #fff;
        font-size: 1.2rem;
        width: 100px;
    }

/* MEDIA QUERIES */
    @media(max-width: 830px){
        .card{
            width: 80vw;
        }

        .image{
            height: 70vh;
            width: 70vw;
        }

        .desc{
            font-size: 85%;
        }

        .products-card{
            /* display: flex;
            align-items: center;
            justify-content: space-between;
            padding-right: 20px;
            border: 1px solid;
            border-radius: 10px;
            margin: 10px; */
            flex-direction: column;
            padding: 10px;
        }

        .product-image{
            width: 30%;
        }

        .select-btn-container{
            justify-content: space-between;
            width: 100%;
            padding: 5px 10px;
            flex-direction: row-reverse;
        }

        .select{
            width: 20%;
        }
    }

    @media(max-width: 620px){
        .image{
            /* height: 80%; */
            height: 30vh;
        }

        .categories-bar{
            max-width: 250px;
            overflow-x: scroll;
            margin-bottom: 20px;
        }
    }

    @media(max-width: 400px){
        margin-top: 15vh;
    }

`