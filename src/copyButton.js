import * as React from "react";
import PropTypes from 'prop-types';
import { useRecordContext, Link } from 'react-admin';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const CopyButton = (props) => {
    const { source } = props;
    const record = useRecordContext(props);
    const value = record[source];
    return <Link href="#" color='primary' onClick={(e) => navigator.clipboard.writeText(value)}><FileCopyIcon fontSize="small"></FileCopyIcon> Copy</Link>;
}

CopyButton.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default CopyButton;