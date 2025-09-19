import styled from 'styled-components'





export const Container = styled.div`
    margin: 25vh 0 3vh;
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
        margin: auto;
    }

    .image{
        width: 50vw;
        height: 50vh;
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

    .menuTitle-container{
        display: flex;
        align-items: center;
        width: 90%;
        justify-content: space-between;
    }

    /* .icon-container{
        display: flex;
        align-items: center;
        gap: 5px;
        background-color: gray;
        padding: 7px;
        border-radius: 10px;
        box-shadow: 2px 2px 4px;
        cursor: pointer;
        transition: .5s;
    }

    .icon-container:active{
        transform: scale(.8);
    }

    .icon-container:hover .text{
        color: whitesmoke;
        transition: .5s;
    } */

    .icon{
        font-size: 25px;
        cursor: pointer;
        transition: .5s;
    }

    .icon:hover{
        color: #dc2b2b;
    }

    .products-container{
        max-height: 40vh;
        overflow-y: auto;
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

    .products-card{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 20px;
        border: 1px solid;
        border-radius: 10px;
        box-shadow: 2px 2px 4px;
        margin: 10px;
    }

    .product-image{	
        border-radius: 10px;
    }

    .select-btn-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .products-card button{
        padding: 5px;
        color: #fff;
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
            width: 100%;
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
            height: 80%;
        }
    }

`