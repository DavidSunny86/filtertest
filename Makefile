TARGET	= filtertest
SOURCES	= $(wildcard *.cpp)
HEADERS	= $(wildcard *.h)
OBJECTS	= $(patsubst %.cpp,%.o,$(SOURCES))
CXXFLAGS	= -Wall -DX11 -I/usr/local/include
LDLIBS	= -lGL -lglfw3 -lXi -lXrandr -lXxf86vm -lX11 -lrt -lpthread -lm -L/usr/local/lib -lopencv_core -lopencv_highgui -lopencv_imgproc -lpng -lm

.PHONY: clean

$(TARGET): $(OBJECTS)
	$(LINK.cc) $^ $(LOADLIBES) $(LDLIBS) -o $@

$(TARGET).dep: $(SOURCES) $(HEADERS)
	$(CXX) $(CXXFLAGS) -MM $(SOURCES) > $(TARGET).dep
	$(MAKE_COMMAND)

clean:
	-$(RM) $(TARGET) *.o *~ .*~ a.out core

-include $(TARGET).dep
