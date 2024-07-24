import Form from '../../components/AccountCreation/Form';
import Form2 from '../../components/AccountCreation/Form2';
import useSignUpPage from "./SignUpController";

function AccountCreationPage() {

    const {
        handleSubmit,
        step,
        formData,
        handleChange,
        handleNext,
        error1,
        handlePrev,
        error2
    } = useSignUpPage()

    return (
        <div className="flex w-full h-screen bg-gray-100">
            <div className="w-full flex items-center justify-center">
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <Form formData={formData} handleChange={handleChange} handleNext={handleNext} error1={error1}/>
                    )}
                    {step === 2 && (
                        <Form2 formData={formData} handleChange={handleChange} handlePrev={handlePrev} handleSubmit={handleSubmit} error2={error2} />
                    )}
                </form>
            </div>
        </div>
    );
}

export default AccountCreationPage;