const GetterSetter = artifacts.require("./GetterSetter.sol");

contract("GetterSetter", accounts => {
  it("Should store the value 53.", async () => {
    const getterSetterInstance = await GetterSetter.deployed();

    // Set value of 53
    await getterSetterInstance.setNumber(53, { from: accounts[0] });

    // Get stored value
    const storedNumber = await getterSetterInstance.getNumber.call();

    assert.equal(storedNumber, 53, "The value 53 was not stored.");
  });

  it("Should store the value Edgar.", async () => {
    const getterSetterInstance = await GetterSetter.deployed();

    // Set value of Edgar
    await getterSetterInstance.setString("Edgar", { from: accounts[0] });

    // Get stored value
    const storedString = await getterSetterInstance.getString.call();

    assert.equal(storedString, "Edgar", "The value Edgar was not stored.");
  });
});
