<template>
  <div class="container">
    <h1>Lottery Contract</h1>
    <p>This Contract is managed by {{manager}}</p>
    <p>There are currently {{players.length}}
      people entered, competing to win {{balance | fromWei}} ether !</p>

    <hr />
    
    <h4>Want to try your luck ?</h4>

      <form @submit.prevent="enter">
        <div>
          <label for="Amount">Amount of ether to enter </label>
          <input id="Amount" type="number" v-model="amount">
        </div>
        <button v-if="!txPending" class="btn btn-success btn-sm" @click="enter">Bet !</button>
        <button v-esle class="btn btn-success btn-sm">Loading... <i class="fas fa-spinner fa-spin"></i></button>
      </form>

      <hr />

      <h4>Pick a winner !</h4>
      <button class="btn btn-danger btn-sm" @click="pickWinner">Pick a winner !</button>

  </div>
</template>

<script>
export default {
  filters: {
    fromWei(balance) {
      return balance / 1000000000000000000000
    }
  },
  data() {
    return {
      manager: null,
      myAccount: null,
      players: [],
      balance: 0,
      amount: 0,
      txPending: false
    }
  },
  async mounted() {
    this.players = await this.$lottery.methods.getPlayers().call()
    this.manager = await this.$lottery.methods.manager().call()
    this.balance = await this.$wallet.eth.getBalance(this.$lottery.options.address)

    const accounts = await this.$wallet.eth.getAccounts()
    this.myAccount = accounts[0]
    
  },
  methods: {
    async enter() {
      if (this.amount > 0) {
        this.txPending = true
        await this.$lottery.methods
        .enter()
        .send({
          from: this.myAccount,
          value: this.$wallet.utils.toWei(this.amount, 'ether')
        });
        this.txPending = false
      }
    },
    async pickWinner() {
      const winner = await this.$lottery.methods
      .pickWinner()
      .send({
        from: this.myAccount
      }).catch(err => {
        console.log(err)
      })

      console.log(winner)
    }
  }
}
</script>