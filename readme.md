# Mo Nabbous' Interpolation

This project aims to implement numerical analysis' interpolation formulas in a way that it auto-selects the best formula for the given data and interpolates with it, and can be **[visualized in with this webpage here](https://htmlpreview.github.io/?https://github.com/monabbous/general-interpolation/blob/master/dist/index.html)**

### Interpolation Formulas Used
- Newton's Forward Formula
- Newton's Backward Formula
- Gauss's Forward Formula
- Gauss's Backward Formula
- Sterling's Formula
- Lagrange's Formula



### General Interpolation Formula
for this project, i wanted to minimize the code's footprint as much as possible, and so i noticed that 5 of those formulas share the same variables and process of calculations, and so i have wrote down a generalized formula with arguments for each formula in order to manipulate the general formula's process.


$$
P(x) = \sum_{i=0}^n (\space\frac{1}{i!} \space\space\frac{\Delta^i y_{\lfloor\frac{i + YIS}{YIF}\rfloor} + A({ \Delta^i y_{\lfloor\frac{i + YIS}{YIF}\rfloor}}, i . \space IAF)}{A(2,i . \space IAF)}\space\prod_{\underset{k\neq i}{k=0}}^{i}p-(\lfloor\frac{k + KS + A(KAF, i + k)}{KF}\rfloor . (-1)^{(k + KS) * KEF}) .DIR)
$$

Note that, i in this formula is going to be used after selected the zero y index, which will be `y index = zero index + getYIndex(i)`


The arguments used in the formula are
```
YIS = y i shifter
YIF = y i factor
IAF = alternating i factor

KS  = k shifter
KF  = k factor
KAF = alternating k factor
KEF = exponent k factor

DIR = direction (forward, backward)
```
And these are the arguments for each formula (except Lagrange's Formula)
```
// Newton's Forward Formula 
NF ⇒ YIS  = 0,  YIF = 0,    IAF = 0, KS = 0, KF = 1, KAF = 0, KEF = 0, DIR = 1

// Newton's Backward Formula 
NB ⇒ YIS  = 0,  YIF = -1,   IAF = 0, KS = 0, KF = 1, KAF = 0, KEF = 0, DIR = -1

// Gauss's Forward Formula 
GF ⇒ YIS  = -1, YIF = -0.5, IAF = 0, KS = 1, KF = 2, KAF = 0, KEF = 1, DIR = 1

// Gauss's Backward Formula 
GB ⇒ YIS  = 0,  YIF = -0.5, IAF = 0, KS = 1, KF = 2, KAF = 0, KEF = 1, DIR = -1

// Sterling's Formula 
S  ⇒ YIS  = 0,  YIF = -0.5, IAF = 1, KS = 0, KF = 2, KAF = 1, KEF = 1, DIR = -1
```