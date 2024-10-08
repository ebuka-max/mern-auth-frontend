import React, { useEffect, useState } from 'react'
import { BiLogIn } from 'react-icons/bi'
import Card from "../../components/card/Card"
import styles from "./auth.module.scss"
import { Link, useNavigate, useParams } from 'react-router-dom'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import { GrInsecure } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithCode, RESET, sendLoginCode } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'
import { toast } from 'react-toastify'


const LoginWithCode = () => {
    const [loginCode, setLoginCode] = useState("")
    const { email } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isLoggedIn, isSuccess } = useSelector((state) => state.auth)

    const sendUserLoginCode = async () => {
        await dispatch(sendLoginCode(email))
        await dispatch(RESET())
    }

    const loginUserWithCode = async (e) => {
        e.preventDefault()

        if (loginCode.length !== 6) {
            return toast.error("Access code must be 6 characters ")
        }

        const code = {
            loginCode
        }

        await dispatch(loginWithCode({ code, email }))
    }

    useEffect(() => {
        if (isSuccess && isLoggedIn) {
            navigate("/profile")
        }


        dispatch(RESET())
    }, [isLoggedIn, isSuccess, dispatch, navigate])

    return (
        <div className={`container ${styles.auth}`}>
            {isLoading && <Loader />}
            <Card>
                <div className={styles.form}>

                    <div className="--flex-center">
                        <GrInsecure size={35} color="#999" />
                    </div>
                    <h2>Enter Access Code</h2>


                    <form onSubmit={loginUserWithCode}>
                        <input type="text" placeholder="Access Code" required
                            name="loginCode" value={loginCode}
                            onChange={(e) => setLoginCode(e.target.value)}
                        />


                        <button type="submit" className="--btn --btn-primary --btn-block">Proceed To Login</button>
                        <span className="--flex-center">Check your email for login access code</span>

                        <div className={styles.links}>
                            <p><Link to="/">Home</Link></p>

                            <p onClick={sendUserLoginCode} className="v-link --color-primary">
                                <b>Resend Code</b>
                            </p>
                        </div>
                    </form>


                </div>
            </Card>
        </div>
    )
}

export default LoginWithCode