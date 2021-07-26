JSC=qjsc
JSCFLAGS=-D os -D std
SOURCES=$(wildcard *.js)
TARGETS=$(SOURCES:.js=)

all: $(TARGETS)

%: %.js
	$(JSC) $(JSCFLAGS) -o $@ $<

clean:
	rm -vf $(TARGETS)
