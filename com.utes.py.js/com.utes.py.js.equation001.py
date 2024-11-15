from sympy import symbols, Eq, solve

class EquaSolver():

    def __init__():
        print('EquaSolver instantiated ...' )

    def simplEq():
        x = symbols('x')
        expr = x - 4 - 2
        sol = solve(expr)
        print(sol[0]  )


    # Quadratic equation x2-5x+6 = 0
    def quadraticEq():
        y = symbols('x')
        eq1 = Eq( x*2 -5x + 6 )
        sol = solve(eq1, dict=True)
        print(sol[0]  )

