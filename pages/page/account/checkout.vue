<template>
  <div>
    <Header />
    <Breadcrumbs title="Checkout" />
    <section class="section-b-space">
      <div class="container">
        <div class="checkout-page">
          <div class="checkout-form">
            <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="onSubmit">
              <div class="row">
                <div class="col-lg-6 col-sm-12 col-xs-12">
                  <div class="checkout-title">
                    <h3>Billing Details</h3>
                  </div>
                  <div class="row check-out">
                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                      <div class="field-label">First Name</div>
                      <ValidationProvider rules="required" v-slot="{ errors }" name="First name">
                        <input type="text" v-model="user.firstName" name="First name"/>
                        <span class="validate-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                      <div class="field-label">Last Name</div>
                      <ValidationProvider rules="required" v-slot="{ errors }" name="Last name">
                        <input type="text" v-model="user.lastName" name="Last name" />
                        <span class="validate-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                      <ValidationProvider rules="required|digits:10" v-slot="{ errors }" name="phone Number">
                        <div class="field-label">Phone</div>
                        <input type="text" v-model="user.phone" name="Phone" />
                        <span class="validate-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                      <div class="field-label">Email Address</div>
                      <ValidationProvider rules="required|email" v-slot="{ errors }" name="Email">
                        <input type="text" v-model="user.email" name="Email Address" />
                        <span class="validate-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                      <div class="field-label">Country</div>
                      <select>
                        <option>India</option>
                        <option selected>South Africa</option>
                        <option>United State</option>
                        <option>Australia</option>
                      </select>
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                      <div class="field-label">Address</div>
                      <ValidationProvider rules="required" v-slot="{ errors }" name="Address">
                        <input type="text" v-model="user.address" name="Address" />
                        <span class="validate-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                      <div class="field-label">Town/City</div>
                      <ValidationProvider rules="required" v-slot="{ errors }" name="City">
                        <input type="text" v-model="user.city" name="City" />
                        <span class="validate-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group col-md-12 col-sm-6 col-xs-12">
                      <div class="field-label">State / County</div>
                      <ValidationProvider rules="required" v-slot="{ errors }" name="State">
                        <input type="text" v-model="user.state" name="State" />
                        <span class="validate-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group col-md-12 col-sm-6 col-xs-12">
                      <div class="field-label">Postal Code</div>
                      <ValidationProvider rules="required" v-slot="{ errors }" name="Postal Code">
                        <input type="text" v-model="user.pincode" name="Postal Code" />
                        <span class="validate-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <nuxt-link
                  :to="{ path: '/page/account/register'}"
                >Create an Account?</nuxt-link>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12 col-xs-12">
                  <div class="checkout-details">
                    <div class="order-box">
                      <div class="title-box">
                        <div>
                          Product
                          <span>Total</span>
                        </div>
                      </div>
                      <ul class="qty"  v-if="cart.length">
                        <li v-for="(item,index) in cart" :key="index">
                          {{ item.title | uppercase }} X {{ item.quantity }}
                          <span>{{ (item.price * curr.curr) * item.quantity | currency(curr.symbol) }}</span>
                        </li>
                      </ul>
                      <ul class="sub-total">
                                        <li>
                          Subtotal
                          <span class="count">{{ cartTotal * curr.curr | currency(curr.symbol) }}</span>
                        </li>
                                        <li>Shipping
                                            <div class="shipping">
                                                <div class="shopping-option">
                                                    <input type="checkbox" name="free-shipping" id="free-shipping">
                                                    <label for="free-shipping">Free Shipping</label>
                                                </div>
                                                <div class="shopping-option">
                                                    <input type="checkbox" name="local-pickup" id="local-pickup">
                                                    <label for="local-pickup">Local Pickup</label>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                      <ul class="sub-total">
                        <li>
                          Total
                          <span class="count">{{ cartTotal * curr.curr | currency(curr.symbol) }}</span>
                        </li>
                      </ul>
                    </div>
                    <div class="payment-box">
                      <div class="upper-box">
                        <div class="payment-options">
                          <ul>
                            <li>
                              <div class="radio-option">
                                <input
                                  type="radio"
                                  name="payment-group"
                                  id="payment-1"
                                  checked="checked"
                                  v-model="payment"
                                  :value="false"
                                />
                                <label for="payment-1">
                                  Stripe
                                  <span
                                    class="small-text"
                                  >Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</span>
                                </label>
                              </div>
                            </li>
                            <li>
                              <div class="radio-option paypal">
                                <input type="radio" :value="true" v-model="payment" name="payment-group" id="payment-3" />
                                <label for="payment-3">
                                  PayPal
                                  <span class="image">
                                    <img src="../../../assets/images/paypal.png" alt />
                                  </span>
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="text-right">
                            <no-ssr>
                                <paypal-checkout
                                  :amount=getamt()
                                  currency="USD"
                                  :client="paypal"
                                  :env="environment"
                                  :button-style="button_style"
                                  v-if="payment"
                                  v-on:payment-authorized="onPaymentComplete"
                                  v-on:payment-cancelled="onCancelled()">
                                </paypal-checkout>
                                </no-ssr>
                        <button type="submit" @click="order()" v-if="cart.length && !payment" :disabled="invalid" class="btn-solid btn">Place Order</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full.esm'
import { mapGetters } from 'vuex'
import Header from '../../../components/header/header1'
import Footer from '../../../components/footer/footer1'
import Breadcrumbs from '../../../components/widgets/breadcrumbs'
export default {
  components: {
    Header,
    Footer,
    Breadcrumbs,
    ValidationProvider,
    ValidationObserver
  },
  computed: {
    ...mapGetters({
      cart: 'cart/cartItems',
      cartTotal: 'cart/cartTotalAmount',
      curr: 'products/changeCurrency'
    })
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
      },
      isLogin: false,
      paypal: {
         sandbox: 'Your_Sendbox_Key'
      },
      payment: false,
      environment: 'sandbox',
      button_style: {
        label: 'checkout',
        size: 'medium', // small | medium | large | responsive
        shape: 'pill', // pill | rect
        color: 'blue' // gold | blue | silver | black
      },
      amtchar: ''
    }
  },
  methods: {
    order() {
      this.isLogin = localStorage.getItem('userlogin')
      if (this.isLogin) {
        this.payWithStripe()
      } else {
        this.$router.replace('/page/account/login-firebase')
      }
    },
    payWithStripe() {
      const handler = (window).StripeCheckout.configure({
          key: 'PUBLISHBLE_KEY', // 'PUBLISHBLE_KEY'
        locale: 'auto',
        closed: function () {
          handler.close()
        },
        token: (token) => {
          this.$store.dispatch('products/createOrder', {
            product: this.cart,
            userDetail: this.user,
            token: token.id,
            amt: this.cartTotal
          })
          this.$router.push('/page/order-success')
        }
      })
      handler.open({
        name: 'Multikart ',
        description: 'Reach to your Dream',
        amount: this.cartTotal * 100
      })
    },
    getamt() {
      return this.cartTotal.toString()
    },
    onPaymentComplete: function (data) {
      this.$store.dispatch('products/createOrder', {
        product: this.cart,
        userDetail: this.user,
        token: data.orderID,
        amt: this.cartTotal
      })
      this.$router.push('/page/order-success')
    },
    onCancelled() {
      console.log('You cancelled a window')
    },
    onSubmit() {
      console.log('Form has been submitted!')
    }
  }
}
</script>
