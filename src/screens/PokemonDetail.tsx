import React from "react";
import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from "react-router-dom";
import { useGetPokemonDetail } from "../hooks/useGetPokemonDetail";

const PokemonDetail = () => {
    const classes = useStyles();
    const { id } = useParams();
    const navigate = useNavigate();
    const { pokemon, loading } = useGetPokemonDetail(id);

    if (loading) {
        return <div>Loading...</div>
    }
    console.log(pokemon);
    return (
        <div className={classes.root}>
            <div className={classes.modal}>
                <h3>Pokemon Details ({pokemon?.number}. {pokemon?.name})</h3>
                <div className={classes.content}>
                    <img className={classes.img} src={pokemon?.image} />
                    <div>
                        <div className={classes.details}>
                            <div className={classes.label}>Classification</div>
                            <div>{pokemon?.classification}</div>
                        </div>
                        <div className={classes.details}>
                            <div className={classes.label}>Max CP</div>
                            <div>{pokemon?.maxCP}</div>
                        </div>
                        <div className={classes.details}>
                            <div className={classes.label}>Max HP</div>
                            <div>{pokemon?.maxHP}</div>
                        </div>
                        <div className={classes.details}>
                            <div className={classes.label}>Flee Rate</div>
                            <div>{pokemon?.fleeRate}</div>
                        </div>
                        <div className={classes.details}>
                            <div className={classes.label}>Height</div>
                            <div>{pokemon?.height.minimum} - {pokemon?.height.maximum}</div>
                        </div>
                        <div className={classes.details}>
                            <div className={classes.label}>Weight</div>
                            <div>{pokemon?.weight.minimum} - {pokemon?.weight.maximum}</div>
                        </div>
                        <div className={classes.details}>
                            <div className={classes.label}>Types</div>
                            <div className={classes.tags}>{pokemon?.types.map(t => <span className={classes.tag} key={t}>{t}</span>)}</div>
                        </div>
                        <div className={classes.details}>
                            <div className={classes.label}>Resistant</div>
                            <div className={classes.tags}>{pokemon?.resistant.map(t => <span className={classes.tag} key={t}>{t}</span>)}</div>
                        </div>
                        <div className={classes.details}>
                            <div className={classes.label}>Weakness</div>
                            <div className={classes.tags}>{pokemon?.weaknesses.map(t => <span className={classes.tag} key={t}>{t}</span>)}</div>
                        </div>
                    </div>
                </div>

                <span onClick={() => navigate(-1)} className={classes.close}>&times;</span>
            </div>
        </div>
    );
};

const useStyles = createUseStyles(
    {
        root: {
            color: '#000',
            width: '100%',
            height: '100%',
            position: 'fixed',
            backgroundColor: 'rgb(0 0 0 / 40%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'rgba(77, 77, 77, .7)',
            transition: 'all .4s'
        },
        modal: {
            height: '600px',
            backgroundColor: 'white',
            borderRadius: '4px',
            position: 'relative',
            width: '70%',
            minWidth: '300px',
            background: '#fff',
            padding: '1em',
            color: '#000'
        },
        content: {
            display: 'flex',
            flexDirection: "column"
        },
        img: {
            margin: '0 auto',
            maxWidth: '330px'
        },
        close: {
            position: 'absolute',
            top: '8px',
            right: '12px',
            color: '#585858',
            textDecoration: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            fontWeight: 'bold'
        },
        details: {
            display: 'grid',
            gridTemplateColumns: '30% 1fr',
            marginBottom: '4px'
        },
        label: {
            fontWeight: "bold",
        },
        tags: {
            display:'flex'
        },
        tag: {
            padding: '4px',
            background: '#2a70a8',
            borderRadius: '8px',
            margin: '4px',
            color: '#fff'
        }

    },
    { name: 'PokemonDetails' }
);





export default PokemonDetail;