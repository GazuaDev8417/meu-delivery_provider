import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    /* justify-content: center; */
    margin: 15vh 5rem;

    h1{
        text-align: center;
        margin: 5vh 0 10vh;
    }

    .logout-icon{
        position: absolute;
        top: 1.5%;
        right: 2%;
        font-size: 2rem;
        cursor: pointer;
    }

    .user-section{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0 0 20px;
        line-height: 30px;
        border-radius: 10px;
    }    

    .address-section{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background-color: lightgray;
        padding: 10px;
        line-height: 30px;
        border-radius: 10px;
    }

    .addressAndName{
        margin: 20px 0 10px;
        line-height: 30px;
    }

    .icon{
        font-size: 2rem;
        cursor: pointer;
        color: red;
        transition: .3s ease-in-out;
    }

    .icon:active{
        transform: scale(.9);
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

    hr{
        width:'100%';
        background:'lightgray';
    }

    .order-history{
        font-size: 1.5rem;
        margin: 5vh 0 3vh;
    }

    .card-container{
        display: flex;
        flex-wrap: wrap;
    }

    .card{
        border: 1px solid;
        border-radius: 10px;
        padding: 5px;
        margin: 5px;
        line-height: 30px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        transition: .5s;
    }

    .rest-name{
        color: #dc2b2b;
        font-size: 1.2rem;
    }
    
    a{
        color: blue;
    }
    a:hover{
        cursor: pointer;
    }

    .btn-container{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;
    }
    
    .sentMarked{
        padding: 5px;
    }
    
    .end-payment{
        padding: 5px;
    }

    .remove-btn{
        padding: 5px;
    }

/* MEDIA QUERY */
    @media(max-width: 517px){
        margin: 15vh 1.5rem;

        .icon{
            display: none;
        }

        .remove-btn{
            display: block;
        }
    }

    @media(max-width: 660px){
        h1{
            font-size: 1.5rem;
        }

        .order-history{
            font-size: 1.2rem;
        }
    }
`