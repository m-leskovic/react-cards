const Footer = () => {
    const date = new Date();
    return (
        <div className="footer text-center mt-4 p-2">
            <p className="footer-p">&copy; MyBank {date.getFullYear()}</p>
        </div>
    )
}

export default Footer