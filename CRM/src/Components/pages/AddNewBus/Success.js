import React, { Component } from 'react';
import Layout from '../../core/Layout';
import Swal from 'sweetalert2';
import { Redirect, withRouter } from 'react-router-dom';
import { addNewBus, updateBus } from '../../../Utils/Requests/Bus';

class Success extends Component {
	state = {
		loading: true,
		error: '',
	};

	async componentDidMount() {
		if (this.props.isUpdate) {
			const resp = await updateBus(this.props.match.params.slug, this.props.formData).catch(err => {
				this.setState({ loading: false, error: err.response.data.error });
			});
			if (resp && resp.status === 200) {
				this.setState({ loading: false });
			}
		} else {
			// Add the bus
			const resp = await addNewBus(this.props.formData).catch(err => {
				this.setState({ loading: false, error: err.response.data.error });
			});
			if (resp && resp.status === 200) {
				this.setState({ loading: false });
			}
		}
	}

	renderMessage = () => {
    const { error } = this.state;
    const message = this.props.isUpdate ? "Cập nhật" : "Thêm";
		if (error) {
			Swal.fire({
				type: 'error',
				title: error,
			});
			return <Redirect to="/" />;
		} else {
			Swal.fire({
				type: 'success',
				title: `${message} thành công!`,
			});
			return <Redirect to="/" />;
		}
	};

	loadingShow = () => {
		return <h1>Loading...</h1>;
	};

	render() {
		return <Layout>{this.state.loading ? this.loadingShow() : this.renderMessage()}</Layout>;
	}
}

export default withRouter(Success);
