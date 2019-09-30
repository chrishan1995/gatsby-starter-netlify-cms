import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../../components/Layout'
import bulmaCalendar from '../../../../node_modules/bulma-calendar/dist/js/bulma-calendar.min.js';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  state = {}

  componentDidMount() {
    const calendars = bulmaCalendar.attach('[type="date"]', {
      type: 'date',
      minDate: '2019-01-01',
      maxDate: new Date(),
      showHeader: false,
    });

    // Loop on each calendar initialized
    calendars.forEach(calendar => {
      calendar._ui.dummy.dummy_1.placeholder = "Select date of purchase";
      // Add listener to date:selected event
      calendar.on('select', date => {
        this.setState({
          purchase_date: date.data.startDate.toString(),
        });
      });
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAttachment = e => {
    this.setState({ [e.target.name]: e.target.files[0] })
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false
    })
  }

  openModal = () => {
    this.setState({
      isModalOpen: true
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target

    if (!this.state.purchase_date) {
      alert('Please select a valid date');
      return
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <section className="section warranty">
          <div className="container">
            <div className="has-text-centered">
              <h1 className="warranty-title">Warranty Registration</h1>
              <div className="warranty-desc">Thank you for purchasing our product. Please fill the form to complete registration of your product warranty. <span className="modal-trigger" onClick={this.openModal}>Learn More</span></div>
              <form
                name="warranty"
                method="post"
                action="/warranty/register/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="warranty" />
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                <div className="field is-horizontal-tablet">
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type={'text'}
                          name={'firstName'}
                          onChange={this.handleChange}
                          id={'firstName'}
                          required={true}
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type={'text'}
                          name={'lastName'}
                          onChange={this.handleChange}
                          id={'lastName'}
                          required={true}
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type={'email'}
                      name={'email'}
                      onChange={this.handleChange}
                      id={'email'}
                      required={true}
                      placeholder="Email Address"
                    />
                  </div>
                </div>
                <div className="field is-horizontal-tablet">
                  <div className="field-body">
                    <div className="field">
                      <div className="control channel">
                        <div className="select">
                          <select
                            name={'channel'}
                            onChange={this.handleChange}
                            id={'channel'}
                            required={true}
                            defaultValue=""
                          >
                            <option value="" hidden>Choose channel of purchase</option>
                            <option value="Amazon.com">Amazon.com</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input type="date" placeholder="Select date of purchase" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className={`file has-name ${this.state.receipt && 'uploaded'}`}>
                    <label className="file-label">
                      <input
                        className="file-input"
                        type="file"
                        name="receipt"
                        required={true}
                        onChange={this.handleAttachment}
                      />
                      <span className="file-cta">
                        <span className="file-label">Upload sales receipt...</span>
                      </span>
                      <span className="file-name-custom">
                        {this.state.receipt ? this.state.receipt.name : 'No file uploaded'}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="field">
                  <button className="button is-black is-rounded contact-btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className={`modal ${this.state.isModalOpen ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <h2 className="modal-card-title">1 Year Limited Warranty Statement <br />for Manufacturing Defects</h2>
                <button className="delete" aria-label="close" onClick={this.closeModal}></button>
              </header>
              <section className="modal-card-body">
              <div className="content">
                <p>Please read this limited warranty carefully. To maintain your warranty, you will need to comply with the conditions stated here. This warranty is for manufacturing defects only and does not cover damages as a result of misuse.</p>
                <ol type="1">
                  <li>Please be sure to register your product at www.mopio.com/warranty/register to receive up to date warranty and product information.</li>
                  <li>Your new product comes with 1-year warranty against manufacturing defects. The warranty starts on the date of purchase. No warranty will be honoured without an original sales receipt. The warranty and financial responsibility of the manufacturuer only applies to the products itself.</li>
                  <li>Manufacturing defects include circumstances where the product has broken under normal use and no longer provides proper support. In the event you encounter a manufacturing defect, please stop using this product immediately and contact customer service.</li>
                  <li>This warranty applies only when the product has been properly used by consumers who purchased the product from authorized channels as a new product. Proper use means using the product on a level surface where all legs touch the floor with an equal distribution of weight. Proper use also means that the product was not abused by the consumer, as defined by the manufacturer. This warranty does not constitute agreement to replace other parts.</li>
                  <li>If the product fails due to manufacturing defects, the manufacturer will repair or replace at its discretion and reserves the right to substitute comparable materials or models and does not guarantee that the replacement part will match existing pieces.</li>
                  <li>In the event the product needs to be inspected by the manufacturer to determine a warranty claim, the transportation cost or removal cost is borne by the consumer.</li>
                </ol>
                </div>
              </section>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
