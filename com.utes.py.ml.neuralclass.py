class ClassOne:
    def m_class1(self):
        print ("Ajeet")

# Definign the calling Class
class ClassTwo(object):
    def __init__(self, c1):
        self.c1 = c1

# The calling method
    def m_class2(self):
        Object_inst = self.c1()
        Object_inst.m_class1()

# Passing classone object as an argument to classTwo
obj = ClassTwo(ClassOne)
obj.m_class2()