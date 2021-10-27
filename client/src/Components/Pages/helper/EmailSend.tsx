import { Button, TextField as Input } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../store';
import { SendPassWordResetMail } from '../../../Actions/Api';


/**This FC is Use When User Forget hi/her password and username. FC is Used to get the Email
 * of User and then Make Api Call to Send the mail to User.
 * @onSucceed : User will redirect to Login Page
 * @onFailed : Error Message will show on screen
 */

const EmailSend: React.FC<{}> = () => {


    const MEL: any = useAppSelector((state) => state.MELReducer);
    const state: any = useAppSelector((state) => state.AuthReducer);

    const dispatch = useAppDispatch()


    /**Check Email is in Right Formate */
    function validateEmail(email: string | undefined): boolean {
        const re: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    // Function Call When User Click On send.
    function handleChange() {
        console.log('call', state)

        if (!validateEmail(state.email)) return;
        
        dispatch({ type: "ChangeLoad", data: true });

        // call Api
        SendPassWordResetMail(state.email as string)
            .then((res) => {
                // Send The Go Back to Home
                console.log(res.data);
                window.location.href = "/";
            }).catch((e) => {
                // Show Error
                dispatch({ type: "ChangeMessage", data: "Enter Valid Email" })
                setTimeout(() => { dispatch({ type: "ChangeMessage", data: "" }) }, 5000);
                console.log(e);

            }).finally(() => {
                dispatch({ type: "ChangeLoad", data: false });
            })

    }





    return (
        <div>
            <h1 className='full flex'><a className="a" href="/">Twitter Master</a></h1>

            <div className="flex column auth">
                <span>The Reset Password Like will send when you enter email and click on send</span>

                {
                    MEL.message && <span className="red a">{MEL.message}</span>
                }

                {


                    <>

                        <h3 className="a">Please Enter Email</h3>
                        <Input
                            type="email"
                            placeholder="Email"
                            variant="outlined"
                            inputProps={{
                                style: {
                                    padding: 10
                                }
                            }}

                            onChange={(event: any) => dispatch({ type: "ChangeEmail", email: event.target.value })}

                            required></Input>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleChange}
                        >
                            {
                                MEL.load
                                ?
                                'Sending...'
                                :
                                'Send'
                            }
                        </Button>
                    </>
                }
            </div>
        </div>
    );
}

export default EmailSend;
