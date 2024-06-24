import React, { useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import Background from "../Component/Background";
import {useNavigate} from "react-router-dom";
import User from "../Model/User.ts";

const Inscription = () => {
    const history = useNavigate();

    const [validated, setValidated] = useState(false);
    const [name,setName]=useState('')
    const [mdp,setMdp]=useState('')
    const [load,setLoad]=useState(false)
    const [error,setError]=useState(false)

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        setLoad(true)
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            setLoad(false)
        }else {
            setLoad(true)
            User.inscription(name,mdp).then((res)=>{
                if (res){
                    window.electron.sendSignupValidated();
                    history('/main');
                }else{
                    setError(true)
                }
            }).catch(()=>{
                setError(true)
                setTimeout(() => {
                    setError(false);
                }, 5000);
            }).finally(()=>{
                setValidated(false);
                setName('')
                setMdp('')
                setLoad(false)
            })
        }
    };

    const setLogin = () => {
        window.electron.sendLogin();
        history('/');
    }
    return (
        <>
            <Background>
                <div className="row p-0 m-0">
                    <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt--8">
                        <div className="card h-100 w-100 rounded-4 mx-auto shadow">
                            <div className="card-body">
                                <h3 className="text-center mb-3 pt-4">S'incrire</h3>
                                <hr className="w-50 mx-auto"/>
                                <Form className="p-md-3 p-sm-2 m-md-3" validated={validated} noValidate onSubmit={(e)=>handleSubmit(e)}  autoComplete={"off"} >
                                    <Row className="mb-3">
                                        <Form.Group as={Col}  sm="12" className="mb-3">
                                            <Form.Label>Nom * </Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Votre nom ou votre email"
                                                value={name}
                                                onChange={(e)=>setName(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm="12" className="mb-3">
                                            <Form.Label> Mot de passe *</Form.Label>
                                            <Form.Control
                                                required
                                                type="Password"
                                                placeholder="Votre mot de passe"
                                                value={mdp}
                                                onChange={(e)=>setMdp(e.target.value)}
                                            />
                                        </Form.Group>
                                        {error ? (
                                            <div className="alert p-2 alert-warning alert-dismissible fade show"
                                                 role="alert">
                                                <p>Erreur de connexion</p>
                                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setError(false)}/>
                                            </div>
                                        ):('')}
                                    </Row>
                                    <div className="row m-0 p-0 w-100">
                                        <div className="col-md-6 ps-0 d-md-block d-none">
                                            <Button className="w-100" variant="danger" onClick={setLogin} type="reset">Login</Button>
                                        </div>
                                        <div className="col-md-6 pe-0 col-sm-12">
                                            <Button variant="warning" className="w-100" type={`${load ? 'button' : 'submit'}`}>
                                                {load ? (<div className="py-0 spinner-border spinner-border-sm text-light" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>):("S'inscrire")}
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Background>
        </>
    )
}
export default Inscription