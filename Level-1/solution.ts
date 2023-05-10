/*
A floating-point underflow vulnerability.

In hack.test.ts, the attacker tricked the system by supplying an extremely high 
amount as a fake payment, immediately followed by a payment reversal.
The exploit passes a huge number, causing an underflow while subtracting the cost of purchased items, resulting in a zero net.

It's a good practice to limit your system input to an acceptable range instead
of accepting any value.

We also need to protect from a scenario where the attacker sends a huge number
of items, resulting in a huge net. We can do this by limiting all variables
to reasonable values.

In addition, using floating-point data types for calculations involving financial values causes unexpected rounding and comparison
errors as it cannot represent decimal numbers with the precision we expect.
For example, running `0.1 + 0.2` in the Javascript console interpreter gives `0.30000000000000004` instead of 0.3.
*/
