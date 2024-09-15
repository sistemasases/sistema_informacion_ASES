import { CSVLink } from 'react-csv';

const DownloadCSV = ({ data, headers, filename }) => {
    return (
        <div className='mx-auto w-80 text-center'>
            <CSVLink
                data={data}
                headers={headers}
                filename={filename}
                target="_blank"
                className='btn btn-success mb-3'
            >
                Descargar CSV
            </CSVLink>
        </div>
    )
}

export default DownloadCSV;