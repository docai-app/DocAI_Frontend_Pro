interface ViewProps {
    content: any;
}

export default function PdfView(props: ViewProps) {
    const { content } = props;
    return (
        <>
            <div className='h-50vh'>
                <object
                    className="object-center object-cover w-full h-full flex justify-center items-center"
                    type="application/pdf"
                    data={content + '#toolbar=0'}
                // width="250"
                >
                    <img
                        src={
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                        }
                        alt="PDF file icon"
                        className="w-full "
                    />
                </object>
            </div>
        </>
    );
}
