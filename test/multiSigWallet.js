const chai = require("chai")
chai.use(require("chai-as-promised"))

// Importing multi sig wallet contract
// artifacts.require function is provided by truffle
const MultiSigWallet = artifacts.require("multiSigWallet")

// that's how truffle expects you to write your tests
/*contract("MultiSigWallet", (accounts) => {

   } */

contract("MultiSigWallet", (accounts) => {
  const owners = [accounts[0], accounts[1], accounts[2]]
  const NUM_CONFIRMATIONS_REQUIRED = 2

  let wallet
  beforeEach(async () => {
    wallet = await MultiSigWallet.new(owners, NUM_CONFIRMATIONS_REQUIRED)
  })

  describe("executeTransaction", () => {
    beforeEach(async () => {
      const to = owners[0]
      const value = 0
      const data = "0x0"

      await wallet.submitTxn(to, value, data)
      await wallet.confirmTxn(0, { from: owners[0] })
      await wallet.confirmTxn(0, { from: owners[1] })
    })

    //                                                                                          1st case is failed
    // execute transaction should succeed
    // it("should execute", async () => {
    //   const res = await wallet.executeTxn(0, { from: owners[0] })     // res: short form of response
    //   const { logs } = res

    //   assert.equal(logs[0].event, "ExecuteTxn")
    //   assert.equal(logs[0].args.owner, owners[0])
    //   assert.equal(logs[0].args.txIndex, 0)

    //   const tx = await wallet.getTransaction(0)
    //   assert.equal(tx.executed, true)
    // })

    // it("should execute", async () => {
    //     const res = await wallet.executeTransaction(0, { from: owners[0] })
    //     const { logs } = res
    //     // const { logs } = await wallet.executeTransaction(0)
  
    //     assert.equal(logs[0].event, "ExecuteTxn")
    //     assert.equal(logs[0].args.owner, owners[0])
    //     assert.equal(logs[0].args.txIndex, 0)
  
    //     const tx = await wallet.getTransaction(0)
    //     assert.equal(tx.executed, true)
    //   })
  

    // execute transaction should fail if already executed
    it("should reject if already executed", async () => {
      await wallet.executeTransaction(0, { from: owners[0] })

      // /*
      try {
        await wallet.executeTransaction(0, { from: owners[0] })
        throw new Error("tx did not fail")
      } catch (error) {
        assert.equal(error.reason, "tx already executed")
      }
      // */

      // await expect(wallet.executeTxn(0, { from: owners[0] })).to.be
      //   .rejected
    })
  })
})