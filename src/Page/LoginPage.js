import React, {useState} from "react";
import Background from "../Component/Background";
import {Col, Form, Row, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import User from "../Model/User.ts";

const LoginPage = () => {
    const history = useNavigate();

    const [validated, setValidated] = useState(false);
    const [name,setName]=useState('')
    const [mdp,setMdp]=useState('')
    const [load,setLoad]=useState(false)
    const [error,setError]=useState(false)
    const [errorConnect,setErrorConnect]=useState(false)

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        }else {
            setLoad(true)
            User.login(name,mdp).then((res)=>{
                if (res.id<0){
                    setErrorConnect(true)
                    setValidated(true)
                    setTimeout(() => {
                        setErrorConnect(false);
                    }, 5000);
                }else{
                    setValidated(false);
                    history('/main');
                }
            }).catch(()=>{
                setError(true)
                setTimeout(() => {
                    setError(false);
                }, 5000);
            }).finally(()=>{
                setName('')
                setMdp('')
                setLoad(false)
            })
        }
    };
    const reset = () => {
        setName('')
        setMdp('')
    }
    return (
        <>
            <Background>
                <div className="row p-0 m-0">
                    <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt--8">
                        <div className="card h-100 w-100 rounded-4 mx-auto shadow">
                            <div className="card-body">
                                <h3 className="text-center mb-3 pt-4">Login</h3>
                                <hr className="w-50 mx-auto"/>
                                <Form className="p-md-3 p-sm-2 m-md-3" validated={validated} onSubmit={(e)=>handleSubmit(e)} noValidate  autoComplete={"off"} >
                                    <Row className="mb-3">
                                        {errorConnect && <div className="text-danger mt-3">Échec de la connexion, veuillez réessayer.</div>}
                                        <Form.Group as={Col}  sm="12" className="mb-3">
                                            <Form.Label>Nom * </Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Votre nom ou votre email"
                                                value={name}
                                                onChange={(e)=>setName(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Veuillez entrer votre Nom ou Email.
                                            </Form.Control.Feedback>
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
                                            <Form.Control.Feedback type="invalid">
                                                Veuillez entrer votre mot de passe.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        {error ? (
                                            <div className="col-12 text-center color-red">
                                                <span>
                                                    Erreur lors de connexion!
                                                </span>
                                            </div>
                                        ):('')}
                                    </Row>
                                    <div className="row m-0 p-0 w-100">
                                        <div className="col-md-6 ps-0 d-md-block d-none">
                                            <Button className="w-100" variant="danger" onClick={reset}>annuler</Button>
                                        </div>
                                        <div className="col-md-6 pe-0 col-sm-12">
                                            <Button variant="warning" className="w-100" type={`${load ? 'button' : 'submit'}`}>
                                                {load ? (<div className="py-0 spinner-border spinner-border-sm" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>):("Valider")}
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
export default LoginPage