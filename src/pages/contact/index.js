import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
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
        <section className="section contact">
          <div className="container">
            <div className="has-text-centered">
              <h1 className="contact-title">Contact Us</h1>
              <div className="contact-desc">Questions? Comments? Let us get in touch with you by filling out the email form below. </div>
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
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
                <div className="field">
                  <div className="control">
                    <textarea
                      className="textarea"
                      name={'message'}
                      onChange={this.handleChange}
                      id={'message'}
                      required={true}
                      placeholder="Type Your Message Here"
                    />
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
        </section>
      </Layout>
    )
  }
}
