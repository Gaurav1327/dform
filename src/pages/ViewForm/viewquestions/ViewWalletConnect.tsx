import { FormField } from '../../../types/Form'
import { Field, ErrorMessage, useFormikContext } from 'formik';
import { AccountBalanceWallet, Logout } from '@mui/icons-material'
import * as fcl from '@onflow/fcl';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';



const ViewWalletConnect = ({ question, themeColor }: { question: FormField; themeColor: string }) => {
    const [user, setUser] = useState<{ addr: string | null } | undefined>()
    const required = question.required;
    const { setFieldValue } = useFormikContext();

    useEffect(() => {
        fcl.currentUser.subscribe(setUser)
    }, [])

    useEffect(() => {
        if (user && user.addr) {
            setFieldValue(question.id, user.addr)
        }
        else if (user && !user.addr) {
            setFieldValue(question.id, undefined)
        }
    }, [user, question])
    console.log(user)
    const handleWalletLogout = async () => {
        // logic for adding the wallet and setting the feild value to 1 or zero accroding to wallet added or not.
        try {
            await fcl.unauthenticate()
        } catch (e) {
            console.error(e)
        }
    };
    const addWallet = async () => {
        // logic for adding the wallet and setting the feild value to 1 or zero accroding to wallet added or not.
        try {
            await fcl.authenticate()
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div className="flex flex-col w-full my-6 justify-center space-y-2">
            <div className='font-semibold' >
                {question.title}
                {required && <span className="text-xl text-red-500"> *</span>}
            </div>
            <div className='text-gray-400 pb-4' >{question.description}</div>
            {/* <Field name={question.formFieldId} type="email" placeholder={question.properties.placeholder} className={`border border-gray-400 focus:border-${themeColor}-500 p-5 rounded-lg outline-none transition duration-200`} /> */}
            <Field name={question.id}>
                {() => (
                    user && user?.addr ? <div className='flex py-2 items-center'>
                        <div className='text-green-400'>Wallet Connected ✅</div>
                        <IconButton onClick={handleWalletLogout}>
                            <Logout fontSize='small' />
                        </IconButton>
                    </div>
                        : <div onClick={addWallet} className={`border min-w-[190px] w-[190px] border-black cursor-pointer hover:bg-${themeColor}-200 focus:border-${themeColor}-500 p-3 rounded-lg outline-none transition duration-200`}>
                            <div className="font-semibold flex items-center space-x-2 justify-center">
                                <AccountBalanceWallet className="h-5 w-5" />
                                <div>Connect Wallet</div>
                            </div>
                        </div>
                )}
            </Field>
            <div className="flex justify-start w-full">
                <ErrorMessage name={question.id}>
                    {(msg: string) => (
                        <div className={`text-red-500 text-sm`}>
                            {msg}
                        </div>
                    )}
                </ErrorMessage>
            </div>
        </div>
    )
}

export default ViewWalletConnect