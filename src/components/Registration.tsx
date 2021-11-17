import React, {useState} from "react";

type formData = {
    fornavn?: string;
    etternavn?: string;
    epost?: string;
    password?: string;
};

const Registration: React.FunctionComponent = () => {
    const [values, setValues] = useState<formData>();
    const [passwordCheck, setPasswordCheck] = useState<string>("");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log(values);
        event.preventDefault();
        if (values?.password != passwordCheck) {
            alert("Password dont match");
            setValues({password: ""});
            setPasswordCheck("");
        }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify({values}),
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const response = await fetch("http://localhost:8080/register", requestOptions);
            const jsonData = await response.json();
        } catch (error) {
            console.log(error);
        }
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [event.target.name]: event.target.value});
    };

    return (
        <div className={"registration"}>
            <h1 className={"title"}>Opprett Konto</h1>
            <form onSubmit={onSubmit}>
                <label className={"user-name-fornavn"}>
                    Fornavn:
                    <input
                        value={values?.fornavn || ""}
                        type="text"
                        name="fornavn"
                        onChange={onChange}
                    />
                </label>
                <label className={"user-name-etternavn"}>
                    Etternavn:
                    <input
                        value={values?.etternavn || ""}
                        type="text"
                        name="etternavn"
                        onChange={onChange}
                    />
                </label>
                <label className={"user-epost"}>
                    E-postadresse:
                    <input
                        value={values?.epost || ""}
                        required={true}
                        name="epost"
                        type="text"
                        onChange={onChange}
                    />
                </label>
                <label className={"user-password-one"}>
                    Passord
                    <input
                        value={values?.password || ""}
                        required={true}
                        name="password"
                        type="password"
                        onChange={onChange}
                    />
                </label>
                <label className={"user-password-two"}>
                    Gjenta passord:
                    <input
                        required={true}
                        type="password"
                        value={passwordCheck}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                    />
                </label>
                <label className={"radio"}>
                    <input type="checkbox" required />
                    Jeg godtar Lorem ipsum dolor sit.
                </label>
                <button className={"btn"} type="submit">
                    Registrer
                </button>
            </form>
        </div>
    );
};

export default Registration;
